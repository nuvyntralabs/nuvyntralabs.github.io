---
title: "LocalStore 1.1.0: Room-Style CRUD for .NET MAUI, on the Engine You Pick"
published: false
description: "Plugin.Maui.LocalStore 1.1.0 keeps insert, find, replace, and delete on IStoreCollection<T> while the host picks SQLite, NuvexaDB, Realm, LiteDB, or another shipped engine. 1.1 adds AutoMigrate, QueryAsync, and generated DAOs."
tags: dotnet, maui, database, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A MAUI app that writes people to SQLite today should still find those people after the host opens a NuvexaDB file.

**Plugin.Maui.LocalStore** is that layer. Version **1.1.0** is on nuget.org. The host sets `StoreBackend`. Application code stays on `IStoreCollection<T>`: insert, find, replace, delete, select. A new engine is a different file and the same methods.

This post is the walkthrough: what 1.1.0 opens, how to register it, the CRUD that stays portable, and the three additions in this release — `AutoMigrate`, `QueryAsync`, and a source-generated `[StoreDao]`.

## What LocalStore is

LocalStore is a Room-style abstract database for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows. MIT licensed. It targets `net10.0`.

It does one job for the host: keep application code on a single collection API while the process opens one embedded engine.

```text
host always calls
  InsertAsync / FindByIdAsync / ReplaceAsync / DeleteByIdAsync / FindAsync
                    ↓
              IStoreCollection<T>
     ┌────────────┼────────────┐
  SQLite      NuvexaDB     Realm / LiteDB / DuckDB
  SQLCipher   Firebird     LMDB / RocksDB / LevelDB
```

| | |
| --- | --- |
| Package | [`Plugin.Maui.LocalStore`](https://www.nuget.org/packages/Plugin.Maui.LocalStore) 1.1.0 |
| Registration | `UseMauiLocalStore` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.LocalStore](https://github.com/nuvyntralabs/Plugin.Maui.LocalStore) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-local-store/](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/) |
| Guides | [Get started](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/integration/) · [How it works](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/docs/) |

`[StoreDao]` generates a facade over that collection. It is a Room-shaped helper for this package. It is separate from AndroidX Room, and LocalStore does not take a `PackageReference` on OfflineSync, JobQueue, or FileVault.

## Why the host picks the engine

Each backend keeps its own file. CRUD on `IStoreCollection<T>` stays the same when you change `StoreBackend`. Copying rows between those files is a separate step (`AutoMigrate` or `MigrateAsync`).

| Database | Kind | Default file | On every MAUI platform |
| --- | --- | --- | --- |
| SQLite | Relational | `app.db` | Yes |
| SQLCipher | Encrypted SQLite | `app.db` | Yes |
| NuvexaDB | Document (`.nvx`) | `app.nvx` | Yes |
| LiteDB | Document | `app.litedb` | Yes |
| Realm | Object | `app.realm` | Yes |
| LMDB | Key-value | `app.lmdb/` | Yes on Android, iOS, and Windows. JSON files on Mac Catalyst |
| DuckDB | Analytical SQL | `app.duckdb` | Native on Windows (`win-x64`, `win-arm64`). JSON files on Android, iOS, and Mac Catalyst |
| Firebird Embedded | Relational | `app.fdb` | Native on Windows. JSON files elsewhere |
| RocksDB | Key-value | `app.rocksdb/` | Native on Windows x64. JSON files elsewhere |
| LevelDB | Key-value | `app.leveldb/` | JSON files on every OS in this pack |

`StoreBackend` defaults to **Nuvexa**. Set it when you want SQLite or another engine. An empty `Path` resolves under `LocalApplicationData/Plugin.Maui.LocalStore/` plus the default file name above.

SQLite, SQLCipher, NuvexaDB, LiteDB, and Realm are the engines that actually run on Android, iOS, Mac Catalyst, and Windows. Pick one of those when the same binary has to use the real database on every head.

Selecting DuckDB, Firebird, RocksDB, LevelDB, or LMDB on Mac Catalyst still opens. `UseMauiLocalStore` does not throw. On an OS without that native library, each row is a JSON file. `InsertAsync`, `FindByIdAsync`, `ReplaceAsync`, `DeleteByIdAsync`, and `FindAsync` still run. Filters run in memory. `EnsureIndexAsync` does nothing. `QueryLanguage` is `None`. Moving those JSON rows onto a native file later uses the same migrate path as any other engine switch.

## Install and define a document

```bash
dotnet add package Plugin.Maui.LocalStore
```

A document is a POCO with a public `string` `Id` (nullable is fine) and a public parameterless constructor. Filters use top-level property names (`Age`, `City`). Get-only properties and `[JsonIgnore]` members are left out of the file. Stored scalars are `string`, `int`, `long`, `double`, `float`, `bool`, and `DateTime`.

```csharp
public sealed class Person
{
    public string? Id { get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string Status { get; set; } = "active";
    public string? City { get; set; }
}
```

`GetCollection<Person>("users")` creates the table or collection on the first write. The same `Person` type is valid on every engine.

## Register

```csharp
using Plugin.Maui.LocalStore;

builder
    .UseMauiApp<App>()
    .UseMauiLocalStore(o =>
    {
        o.Backend = StoreBackend.Sqlite;
        o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.db");
        o.CreateIfMissing = true;
    });

var store = LocalStore.Current;
var users = store.GetCollection<Person>("users");
```

A console or test host can skip the MAUI builder:

```csharp
await using var store = LocalStore.Open(new LocalStoreOptions
{
    Backend = StoreBackend.Sqlite,
    Path = path
});
```

`services.AddMauiLocalStore(...)` is the DI form of the same options.

Nuvexa is the default backend. Pass `EncryptionKey` when the file is an encrypted `.nvx`, a SQLCipher database, a LiteDB password, a Realm file, or a Firebird SYSDBA password. SQLite, DuckDB, LMDB, RocksDB, and LevelDB ignore that key. Keep the secret in `SecureStorage` (or the platform keystore). A shipped app keeps it out of source and logs.

```csharp
builder.UseMauiLocalStore(o =>
{
    o.Backend = StoreBackend.Nuvexa;
    o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.nvx");
    o.EncryptionKey = key;
    o.CreateIfMissing = true;
    o.CacheSizeMb = 16;
});
```

SQLCipher needs its own file. Open `app-cipher.db`. Leave an unencrypted `app.db` on the SQLite backend.

## Create, read, update, delete

These calls are the same on every engine. Only `StoreBackend` and the path change.

```csharp
var id = await users.InsertAsync(new Person
{
    Name = "Ada",
    Age = 36,
    Status = "active",
    City = "London"
});
// Id is generated when Person.Id is null, then written back onto the POCO

var ada = await users.FindByIdAsync(id);
ada.Name = "Ada Lovelace";
await users.ReplaceAsync(ada); // a missing Id throws LocalStoreException

var removed = await users.DeleteByIdAsync(id); // false when the id is absent
```

`InsertManyAsync` takes a list and returns the ids. `FindAsync()` with no filter returns every row.

## Select without SQL

`StoreFilter` and `StoreQuery` are the portable query. SQLite and DuckDB run them as SQL when the native engine is open. Nuvexa maps property names onto NQL paths (`Age` → `age`, `Id` → `_id`). Key-value engines filter in memory.

```csharp
var adults = await users.FindAsync(
    StoreFilter.Gte("Age", 21),
    new StoreQuery { SortBy = "Name", Limit = 20 });

var londonActive = await users.FindAsync(
    StoreFilter.And(
        StoreFilter.Eq("City", "London"),
        StoreFilter.Eq("Status", "active")),
    new StoreQuery { SortBy = "Age", SortDescending = true });

await users.EnsureIndexAsync("City", "Status");
```

| Filter | Meaning |
| --- | --- |
| `StoreFilter.Eq` | Equal |
| `StoreFilter.Ne` | Not equal |
| `StoreFilter.Gte` | Greater than or equal |
| `StoreFilter.Lt` | Less than |
| `StoreFilter.And` / `Or` | All children / any child |

`StoreQuery.Limit` of `0` means no limit. `Skip` pages the same filter.

## Copy a collection onto another engine

Dispose does not copy data. Each engine file stays independent until you ask. On open, `AutoMigrate` copies registered collections when the destination collection is empty. `Map<T>` is required so both engines read and write the same POCOs. A destination that already has rows is left as it is (`Skipped`).

```csharp
builder.UseMauiLocalStore(o =>
{
    o.Backend = StoreBackend.Nuvexa;
    o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.nvx");
    o.EncryptionKey = key;
    o.AutoMigrate = true;
    o.MigrateFrom = StoreBackend.Sqlite;
    o.Map<Person>("users");
});
```

If `MigrateFrom` is omitted and exactly one other engine file sits next to the destination, that file is the source. Two or more siblings throw until you name `MigrateFrom`.

You can also copy without replacing `LocalStore.Current`:

```csharp
var result = await LocalStore.MigrateAsync(
    new LocalStoreOptions { Backend = StoreBackend.Sqlite, Path = sqlitePath },
    new LocalStoreOptions { Backend = StoreBackend.Nuvexa, Path = nvxPath, EncryptionKey = key }
        .Map<Person>("users"));
```

`StoreMigrationResult` reports `From`, `To`, `Collections`, `Documents`, `Skipped`, and `Reason`. `DeleteSourceAfterMigrate` removes the source file after a successful copy. It defaults to false.

Schema changes inside one engine stay in your code. Adding a property to `Person` is your change on that file. Moving `users` from SQLite to Nuvexa is the migrate path above.

## Raw SQL or NQL, when the engine has a language

`QueryAsync<T>` and `ExecuteAsync` sit on `ILocalStore`. The dialect is `store.QueryLanguage`. Check it before you send a command.

| Engine | `QueryLanguage` |
| --- | --- |
| SQLite, SQLCipher | `Sql` |
| DuckDB, Firebird | `Sql` when native. `None` on the JSON fallback |
| Nuvexa | `Nql` |
| LiteDB, Realm, LMDB, RocksDB, LevelDB | `None` — the call throws `LocalStoreException` |

```csharp
if (store.QueryLanguage == StoreQueryLanguage.Sql)
{
    await store.ExecuteAsync(
        "UPDATE users SET Status = ? WHERE City = ?",
        ["active", "London"]);
    var adults = await store.QueryAsync<Person>(
        "SELECT * FROM users WHERE Age >= ?",
        [21]);
}

if (store.QueryLanguage == StoreQueryLanguage.Nql)
{
    var adults = await store.QueryAsync<Person>(
        """db.users.find({ age: { $gte: 21 } }).sort({ name: 1 }).limit(20)""");
}
```

SQL placeholders are `?`. NQL is the text NuvexaDB already speaks. `INuvexaLocalStore.ExecuteNqlAsync` still returns raw JSON strings. Prefer `QueryAsync<T>` when you want `Person` instances. NQL update and delete need NuvexaDB 1.0.2 or newer. LocalStore 1.1 references `Nuventra.NuvexaDB` 1.0.7 for the Nuvexa backend.

The shared path for application code remains `FindAsync`. Reach for `QueryAsync` when a screen needs SQL or NQL that `StoreFilter` does not express, and when you have already chosen an engine whose `QueryLanguage` is `Sql` or `Nql`.

## A generated DAO

`[StoreDao]` marks an interface. The generator emits an implementation that wraps `IStoreCollection<T>` and `QueryAsync`. CRUD method names map to the collection. `[StoreRaw]` calls `QueryAsync`. Placeholders are `{parameterName}`.

```csharp
[StoreDao("users", typeof(Person))]
public interface IPersonDao
{
    Task<string> InsertAsync(Person item, CancellationToken cancellationToken = default);
    Task<Person?> FindByIdAsync(string id, CancellationToken cancellationToken = default);

    [StoreRaw(
        Sql = "SELECT * FROM users WHERE Age >= {minAge}",
        Nql = "db.users.find({ age: { $gte: {minAge} } })")]
    Task<IReadOnlyList<Person>> FindAdultsAsync(int minAge, CancellationToken cancellationToken = default);
}

services.AddMauiLocalStoreDao<IPersonDao>();
var adults = await store.GetDao<IPersonDao>().FindAdultsAsync(21);
```

`[StoreRaw]` carries both dialects so the same interface compiles against SQLite and Nuvexa. The running store uses the string that matches `QueryLanguage`.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `LocalStoreException` on `ReplaceAsync` | The POCO needs a non-empty `Id`. Insert first, or set `Id` before replace. |
| `LocalStoreException` and the file is missing | `CreateIfMissing` is false. Set it true, or create the file before open. |
| `QueryAsync` throws | `QueryLanguage` is `None` (LiteDB, Realm, a key-value engine, or a JSON fallback). Stay on `FindAsync`, or switch to SQLite, SQLCipher, or Nuvexa. |
| Open succeeded, queries feel like a folder of JSON | DuckDB, Firebird, RocksDB, LevelDB, or LMDB on Catalyst is on the JSON fallback. Use SQLite, SQLCipher, NuvexaDB, LiteDB, or Realm for a real engine on every OS. |
| Rows vanished after a backend change | Dispose and `Open` do not copy. Set `AutoMigrate` and `Map<T>`, or call `MigrateAsync`. |
| Migrate skipped a collection | The destination already had rows. Destination rows win. |
| Migrate throws with several files nearby | Set `MigrateFrom` (and `MigrateFromPath` if the source is not beside the destination). |
| Encrypted `.nvx` or SQLCipher will not open | Pass the same `EncryptionKey` used at create. Store it in `SecureStorage`. |
| SQLCipher opened the old SQLite file | Use a different path, such as `app-cipher.db`. |

## Where LocalStore sits next to the other tools

| Need | Tool |
| --- | --- |
| Local rows or documents, and the host picks the engine | **LocalStore** — `Plugin.Maui.LocalStore` |
| Offline-first writes, a sync queue, and conflicts | [Plugin.Maui.OfflineSync](https://nuvyntralabs.github.io/packages/plugin-maui-offline-sync/) |
| Durable jobs, retry, and a dead-letter path | [Plugin.Maui.JobQueue](https://nuvyntralabs.github.io/packages/plugin-maui-job-queue/) |
| Retry a failed call | [Plugin.Maui.RetryQueue](https://nuvyntralabs.github.io/packages/plugin-maui-retry-queue/) |
| Encrypted files (images, PDFs) | [Plugin.Maui.FileVault](https://nuvyntralabs.github.io/packages/plugin-maui-file-vault/) |
| The `.nvx` engine, NQL, and Data Studio | [NuvexaDB](https://nuvyntralabs.github.io/nuvexadb/) — `Nuventra.NuvexaDB` |
| A new MAUI host; LocalStore only when the spec asks | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) |

Use the engine package directly when the app is committed to one database and needs that vendor’s query language, relationships, or tooling. Use LocalStore when the host must pick SQLite today and keep insert, find, replace, and delete stable if the file later becomes Nuvexa, Realm, or LiteDB.

## Try it

```bash
dotnet add package Plugin.Maui.LocalStore
```

Register `UseMauiLocalStore` with `StoreBackend.Sqlite` and `app.db`, insert one `Person`, and `FindByIdAsync` it. To see every engine, clone the sample. `MauiProgram` there leaves registration to a backend picker that calls `LocalStore.Open`.

- NuGet: [Plugin.Maui.LocalStore](https://www.nuget.org/packages/Plugin.Maui.LocalStore)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.LocalStore](https://github.com/nuvyntralabs/Plugin.Maui.LocalStore)
- Sample: [Plugin.Maui.LocalStore.Sample](https://github.com/nuvyntralabs/Plugin.Maui.LocalStore/tree/main/samples/Plugin.Maui.LocalStore.Sample)
- Get started: [nuvyntralabs.github.io/packages/plugin-maui-local-store/integration/](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/integration/)
- Comparison: [nuvyntralabs.github.io/packages/plugin-maui-local-store/comparison/](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/comparison/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
