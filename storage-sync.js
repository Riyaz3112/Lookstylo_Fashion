(function () {
    const storage = window.localStorage;
    const storagePrototype = Storage.prototype;
    const nativeSetItem = storagePrototype.setItem;
    const nativeRemoveItem = storagePrototype.removeItem;
    const nativeClear = storagePrototype.clear;
    const apiAvailable = window.location.protocol === 'http:' || window.location.protocol === 'https:';
    const pendingChanges = new Map();
    let backendConnected = false;
    let debounceTimer = null;
    let activeSync = null;

    function scheduleSync(delay = 300) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(syncPendingChanges, delay);
    }

    async function syncPendingChanges() {
        await window.storageReady;
        if (!backendConnected || pendingChanges.size === 0 || activeSync) return;

        const changes = Object.fromEntries(pendingChanges);
        pendingChanges.clear();
        activeSync = fetch('/api/storage', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(changes)
        }).then(response => {
            if (!response.ok) throw new Error(`Storage API returned ${response.status}`);
        }).catch(error => {
            for (const [key, value] of Object.entries(changes)) {
                if (!pendingChanges.has(key)) pendingChanges.set(key, value);
            }
            console.warn('Could not sync data to SQLite; browser storage is still available.', error);
        }).finally(() => {
            activeSync = null;
            if (pendingChanges.size > 0) scheduleSync(2000);
        });

        await activeSync;
    }

    storagePrototype.setItem = function (key, value) {
        nativeSetItem.call(this, key, value);
        if (this === storage) {
            pendingChanges.set(String(key), String(value));
            scheduleSync();
        }
    };

    storagePrototype.removeItem = function (key) {
        nativeRemoveItem.call(this, key);
        if (this === storage) {
            pendingChanges.set(String(key), null);
            scheduleSync();
        }
    };

    storagePrototype.clear = function () {
        nativeClear.call(this);
        if (this === storage) {
            pendingChanges.clear();
            window.storageReady.then(async () => {
                if (!backendConnected) return;
                try {
                    await fetch('/api/storage', { method: 'DELETE' });
                } catch (error) {
                    console.warn('Could not clear SQLite storage.', error);
                }
            });
        }
    };

    window.storageReady = (async function () {
        if (!apiAvailable) {
            window.storageBackendConnected = false;
            return;
        }

        try {
            const response = await fetch('/api/storage');
            if (!response.ok) throw new Error(`Storage API returned ${response.status}`);
            const remoteValues = await response.json();
            const localValues = {};

            for (let index = 0; index < storage.length; index += 1) {
                const key = storage.key(index);
                localValues[key] = storage.getItem(key);
            }

            for (const [key, value] of Object.entries(remoteValues)) {
                nativeSetItem.call(storage, key, value);
            }

            const legacyValues = Object.fromEntries(
                Object.entries(localValues).filter(([key]) => !Object.hasOwn(remoteValues, key))
            );

            if (Object.keys(legacyValues).length > 0) {
                const seedResponse = await fetch('/api/storage', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(legacyValues)
                });
                if (!seedResponse.ok) throw new Error(`Storage API returned ${seedResponse.status}`);
            }

            backendConnected = true;
            window.storageBackendConnected = true;
            if (pendingChanges.size > 0) scheduleSync();
        } catch (error) {
            window.storageBackendConnected = false;
            console.warn('SQLite backend is unavailable; using browser storage.', error);
        }
    })();

    window.flushStorageSync = async function () {
        clearTimeout(debounceTimer);
        await syncPendingChanges();
        return backendConnected;
    };

    window.addEventListener('online', () => scheduleSync(0));
    window.addEventListener('beforeunload', () => {
        if (!backendConnected || pendingChanges.size === 0) return;
        fetch('/api/storage', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(pendingChanges)),
            keepalive: true
        }).catch(() => {});
    });
})();