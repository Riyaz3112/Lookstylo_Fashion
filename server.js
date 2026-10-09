'use strict';

const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '127.0.0.1';
const dataDirectory = process.env.DATA_DIR || path.join(__dirname, 'data');

fs.mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(path.join(dataDirectory, 'lookstylo.sqlite'));
database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS app_storage (
        storage_key TEXT PRIMARY KEY,
        storage_value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`);

const readStorage = database.prepare('SELECT storage_key, storage_value FROM app_storage');
const upsertStorage = database.prepare(`
    INSERT INTO app_storage (storage_key, storage_value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(storage_key) DO UPDATE SET
        storage_value = excluded.storage_value,
        updated_at = CURRENT_TIMESTAMP
`);
const deleteStorage = database.prepare('DELETE FROM app_storage WHERE storage_key = ?');

app.disable('x-powered-by');
app.use(express.json({ limit: '20mb' }));

app.get('/api/health', (req, res) => {
    res.json({ ok: true, database: 'sqlite' });
});

app.get('/api/storage', (req, res) => {
    const values = Object.fromEntries(readStorage.all().map(row => [row.storage_key, row.storage_value]));
    res.json(values);
});

app.put('/api/storage', (req, res) => {
    const values = req.body;
    if (!values || typeof values !== 'object' || Array.isArray(values)) {
        return res.status(400).json({ error: 'Expected a JSON object of storage keys and values.' });
    }

    const entries = Object.entries(values);
    if (entries.length > 2000 || entries.some(([key, value]) =>
        key.length > 512 || (value !== null && typeof value !== 'string')
    )) {
        return res.status(400).json({ error: 'Storage batch contains invalid keys or values.' });
    }

    database.exec('BEGIN IMMEDIATE');
    try {
        for (const [key, value] of entries) {
            if (value === null) deleteStorage.run(key);
            else upsertStorage.run(key, value);
        }
        database.exec('COMMIT');
    } catch (error) {
        database.exec('ROLLBACK');
        console.error('Storage transaction failed:', error);
        return res.status(500).json({ error: 'Unable to save application data.' });
    }

    res.json({ saved: entries.length });
});

app.delete('/api/storage', (req, res) => {
    database.exec('DELETE FROM app_storage');
    res.json({ cleared: true });
});

app.use('/data', (req, res) => res.sendStatus(404));
app.use(express.static(__dirname, { dotfiles: 'deny', index: 'index.html' }));

const server = app.listen(port, host, () => {
    console.log(`LookStylo billing server: http://${host}:${port}`);
    console.log(`SQLite database: ${path.join(dataDirectory, 'lookstylo.sqlite')}`);
});

function shutdown() {
    server.close(() => {
        database.close();
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);