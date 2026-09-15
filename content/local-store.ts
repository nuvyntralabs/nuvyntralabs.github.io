import type { DocSection } from "@/content/mvvmexpress";

export const localStoreSlug = "plugin-maui-local-store";

export const localStoreDocsHref = `/packages/${localStoreSlug}/docs/`;
export const localStoreIntegrationHref = `/packages/${localStoreSlug}/integration/`;
export const localStoreComparisonHref = `/packages/${localStoreSlug}/comparison/`;

export const localStoreTechnicalTitle = "How LocalStore works";
export const localStoreTechnicalDescription =
  "A Room-style abstract database layer for .NET MAUI. The host picks StoreBackend; application code always uses the same ILocalStore / IStoreCollection<T> methods. 1.1 adds AutoMigrate, QueryAsync / ExecuteAsync, and source-generated [StoreDao] interfaces.";

export const localStoreIntegrationTitle = "Get started with LocalStore";
export const localStoreIntegrationDescription =
  "Install 1.1.0, register UseMauiLocalStore, define a POCO with a string Id, then insert / find / replace / delete / select. The same methods work on every engine. Opt into AutoMigrate, QueryAsync, or a generated DAO when you need them.";

export const localStoreComparisonTitle = "LocalStore vs SQLite, NuvexaDB, Room, and sibling plugins";
export const localStoreComparisonDescription =
  "Compare Plugin.Maui.LocalStore with a direct engine API, Android Room, OfflineSync, JobQueue, and FileVault — and when to choose each.";

export const localStoreTechnicalSections: DocSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    blocks: [
      {
        type: "p",
        text: "LocalStore is an abstract database layer for .NET MAUI on Android, iOS, Mac Catalyst, and Windows. The host picks an engine (StoreBackend). Application code always uses the same methods on ILocalStore / IStoreCollection<T>. You do not change insert / find / replace / delete / select when you add or switch a backend. Each engine has its own file. Set AutoMigrate and Map<T> to copy collections when you switch. Raw SQL or NQL runs on ILocalStore.QueryAsync. Optional [StoreDao] interfaces are source-generated.",
      },
      {
        type: "code",
        code: `host always calls
  InsertAsync / InsertManyAsync / FindByIdAsync / ReplaceAsync / DeleteByIdAsync / FindAsync
                    ↓
              IStoreCollection<T>
     ┌────────────┼────────────┐
  SQLite      NuvexaDB     Realm / LiteDB / DuckDB
  SQLCipher   Firebird     LMDB / RocksDB / LevelDB`,
      },
      {
        type: "callout",
        title: "Not a job queue, sync engine, or androidx.room",
        text: "This is not JobQueue or RetryQueue (durable jobs). It is not OfflineSync (sync + conflicts). [StoreDao] is a Room-style generator over this facade, not androidx.room. There is no sibling PackageReference to those plugins.",
      },
    ],
  },
  {
    id: "engines",
    title: "Local / embedded databases",
    blocks: [
      {
        type: "p",
        text: "1.1 opens every engine in the table. Host CRUD stays the same. NuvexaDB is Nuventra.NuvexaDB. Every row is reached through the same IStoreCollection<T> methods.",
      },
      {
        type: "table",
        headers: ["Database", "Type", "Default path", "Best for", "Status"],
        rows: [
          ["SQLite", "Relational", "app.db", "General-purpose local DB", "Shipped"],
          ["NuvexaDB", "Document NoSQL", "app.nvx", "Embedded .nvx documents", "Shipped"],
          ["Realm", "Object DB", "app.realm", "Mobile / offline-first", "Shipped"],
          ["LiteDB", "Document NoSQL", "app.litedb", "Embedded NoSQL", "Shipped"],
          ["DuckDB", "Analytical SQL", "app.duckdb", "Analytics / OLAP", "Shipped (JSON fallback on mobile)"],
          ["SQLCipher", "Encrypted SQLite", "app.db", "Secure local DB", "Shipped"],
          ["Firebird Embedded", "Relational", "app.fdb", "More advanced relational DB", "Shipped (JSON fallback without fbembed)"],
          ["LMDB", "Key-value", "app.lmdb/", "Very fast key-value storage", "Shipped"],
          ["RocksDB", "Key-value", "app.rocksdb/", "High-performance storage", "Shipped (JSON fallback on mobile)"],
          ["LevelDB", "Key-value", "app.leveldb/", "Simple KV storage", "Shipped (JSON fallback when native is missing)"],
        ],
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    blocks: [
      {
        type: "p",
        text: "LocalStore targets Android, iOS, Windows, and Mac Catalyst. You set StoreBackend the same way on every OS. Yes = that database actually runs. JSON fallback = the NuGet has no native library for that OS, so LocalStore does not use the real engine.",
      },
      {
        type: "table",
        headers: ["Database", "Android", "iOS", "Windows", "Mac Catalyst"],
        rows: [
          ["SQLite", "Yes", "Yes", "Yes", "Yes"],
          ["SQLCipher", "Yes", "Yes", "Yes", "Yes"],
          ["NuvexaDB", "Yes", "Yes", "Yes", "Yes"],
          ["LiteDB", "Yes", "Yes", "Yes", "Yes"],
          ["Realm", "Yes", "Yes", "Yes", "Yes"],
          ["LMDB", "Yes", "Yes", "Yes", "JSON fallback"],
          ["DuckDB", "JSON fallback", "JSON fallback", "Yes (win-x64, win-arm64)", "JSON fallback"],
          ["Firebird", "JSON fallback", "JSON fallback", "Yes (Embedded NuGet)", "JSON fallback"],
          ["RocksDB", "JSON fallback", "JSON fallback", "Yes (win-x64 only)", "JSON fallback"],
          ["LevelDB", "JSON fallback", "JSON fallback", "JSON fallback", "JSON fallback"],
        ],
      },
      {
        type: "p",
        text: "Selection does not change on an unsupported platform. Keep o.Backend = StoreBackend.DuckDb (or Firebird, RocksDB, LevelDB, or LMDB on Catalyst). LocalStore.Open / UseMauiLocalStore does not throw. On that OS, each row is a JSON file. InsertAsync, FindByIdAsync, ReplaceAsync, DeleteByIdAsync, and FindAsync still work. Filters run in memory. EnsureIndexAsync does nothing. QueryLanguage is None.",
      },
      {
        type: "callout",
        title: "JSON fallback is not the native engine",
        text: "This is not DuckDB / Firebird / RocksDB / LevelDB / LMDB. Switching later to a native file on a supported OS still needs AutoMigrate + Map<T>, the same as any other engine switch. Use SQLite, SQLCipher, NuvexaDB, LiteDB, or Realm when you need the real engine on every MAUI platform.",
      },
    ],
  },
  {
    id: "common-methods",
    title: "Common methods",
    blocks: [
      {
        type: "p",
        text: "Portable CRUD stays on IStoreCollection<T>. Raw SQL / NQL is optional on ILocalStore. Every backend must implement the collection operations:",
      },
      {
        type: "table",
        headers: ["Operation", "Method"],
        rows: [
          ["Create", "InsertAsync / InsertManyAsync"],
          ["Read", "FindByIdAsync"],
          ["Update", "ReplaceAsync"],
          ["Delete", "DeleteByIdAsync"],
          ["Select", "FindAsync(StoreFilter, StoreQuery)"],
          ["Raw SQL / NQL", "ILocalStore.QueryAsync<T> / ExecuteAsync"],
          ["Generated DAO", "store.GetDao<T>()"],
          ["Index", "EnsureIndexAsync"],
          ["Close", "DisposeAsync"],
        ],
      },
      {
        type: "p",
        text: "POCOs need a public string Id (nullable is fine) and a public parameterless constructor. Filters use top-level property names (Age, City). Get-only or [JsonIgnore] members are not stored. Scalar types: string, int, long, double, float, bool, DateTime.",
      },
    ],
  },
  {
    id: "options",
    title: "Options",
    blocks: [
      {
        type: "p",
        text: "LocalStoreOptions.Backend defaults to StoreBackend.Nuvexa. Set it explicitly when you want SQLite or another engine. When Path is empty, the file is LocalApplicationData/Plugin.Maui.LocalStore/ plus the default path in the engine table.",
      },
      {
        type: "table",
        headers: ["Option", "Default", "Used by"],
        rows: [
          ["Backend", "Nuvexa", "All"],
          ["Path", "see ResolvePath", "All (file or directory, per engine)"],
          ["CreateIfMissing", "true", "All. false throws LocalStoreException if the file is missing"],
          [
            "EncryptionKey",
            "none",
            "Nuvexa (required to open an encrypted .nvx), SQLCipher (required), LiteDB password, Realm, Firebird SYSDBA password. Ignored by SQLite, DuckDB, LMDB, RocksDB, LevelDB",
          ],
          ["CacheSizeMb", "16", "Nuvexa only"],
          ["AutoMigrate", "false", "Copy Map<T> collections from another engine file when the destination is empty"],
          ["MigrateFrom", "none", "Source engine. Required when more than one sibling file exists"],
          ["MigrateFromPath", "none", "Source file. Empty uses the destination folder"],
          ["MigrateFromEncryptionKey", "none", "Source key. Empty reuses EncryptionKey"],
          ["DeleteSourceAfterMigrate", "false", "Remove the source file after a successful copy"],
          ["Map<T>(name)", "none", "Registers a collection for migrate (required when AutoMigrate is true)"],
        ],
      },
    ],
  },
  {
    id: "engine-packages",
    title: "Engine NuGet references",
    blocks: [
      {
        type: "table",
        headers: ["Backend", "Package"],
        rows: [
          ["SQLite", "sqlite-net-base, SQLitePCLRaw.bundle_e_sqlite3"],
          ["SQLCipher", "same mapping + SQLitePCLRaw.bundle_e_sqlcipher (do not also reference sqlite-net-sqlcipher)"],
          ["NuvexaDB", "Nuventra.NuvexaDB 1.0.6"],
          ["LiteDB", "LiteDB"],
          ["Realm", "Realm"],
          ["DuckDB", "DuckDB.NET.Data.Full (desktop natives)"],
          [
            "Firebird",
            "FirebirdSql.Data.FirebirdClient, FirebirdDb.Embedded.V5.NativeAssets.Windows.All, FirebirdDb.Embedded.V5.NativeAssets.Linux.All",
          ],
          ["LMDB", "LightningDB"],
          ["RocksDB", "RocksDB (desktop natives)"],
          ["LevelDB", "LevelDB.Standard with ExcludeAssets=native;build;buildTransitive"],
        ],
      },
    ],
  },
  {
    id: "raw-query",
    title: "Raw SQL / NQL",
    blocks: [
      {
        type: "p",
        text: "ILocalStore.QueryAsync<T> / ExecuteAsync are on the shared store. The dialect is store.QueryLanguage. JSON fallback (mobile DuckDB / Firebird / RocksDB / LevelDB, and LMDB on Catalyst) reports None.",
      },
      {
        type: "table",
        headers: ["Engine", "QueryLanguage", "Command"],
        rows: [
          ["SQLite, SQLCipher", "Sql", "SQL"],
          ["DuckDB, Firebird", "Sql when native; None on the JSON fallback", "SQL when native"],
          ["Nuvexa", "Nql", "NQL"],
          ["LiteDB, Realm, LMDB, RocksDB, LevelDB", "None", "throws LocalStoreException"],
        ],
      },
      {
        type: "code",
        code: `if (store.QueryLanguage == StoreQueryLanguage.Sql)
{
    var adults = await store.QueryAsync<Person>(
        "SELECT * FROM users WHERE Age >= ?",
        [21]);
}

if (store.QueryLanguage == StoreQueryLanguage.Nql)
{
    var adults = await store.QueryAsync<Person>(
        """db.users.find({ age: { $gte: 21 } }).sort({ name: 1 }).limit(20)""");
}`,
      },
      {
        type: "p",
        text: "INuvexaLocalStore.ExecuteNqlAsync still returns raw JSON strings. Prefer QueryAsync<T> when you want POCOs. NQL update / delete needs NuvexaDB 1.0.2+.",
      },
      {
        type: "link",
        href: "/nuvexadb/docs/query/",
        label: "NuvexaDB NQL",
        note: "Engine query language when QueryLanguage is Nql.",
      },
    ],
  },
  {
    id: "migrate",
    title: "Automatic migration",
    blocks: [
      {
        type: "p",
        text: "Each engine keeps its own file. On open, LocalStore can copy registered collections when the destination is empty. Map<T> is required so both engines can read and write the same POCOs. If MigrateFrom is omitted and exactly one other engine file sits next to the destination, that file is used. Two or more siblings throw until you set MigrateFrom.",
      },
      {
        type: "code",
        code: `builder.UseMauiLocalStore(o =>
{
    o.Backend = StoreBackend.Nuvexa;
    o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.nvx");
    o.EncryptionKey = key;
    o.AutoMigrate = true;
    o.MigrateFrom = StoreBackend.Sqlite;
    o.Map<Person>("users");
});`,
      },
      {
        type: "p",
        text: "Or copy without changing LocalStore.Current:",
      },
      {
        type: "code",
        code: `var result = await LocalStore.MigrateAsync(
    new LocalStoreOptions { Backend = StoreBackend.Sqlite, Path = sqlitePath },
    new LocalStoreOptions { Backend = StoreBackend.Nuvexa, Path = nvxPath, EncryptionKey = key }
        .Map<Person>("users"));`,
      },
      {
        type: "p",
        text: "Destination rows win: a non-empty mapped collection is left unchanged (Skipped). JSON-fallback folders migrate the same way as native files. StoreMigrationResult reports From, To, Collections, Documents, Skipped, and Reason.",
      },
    ],
  },
  {
    id: "dao",
    title: "Source-generated DAOs",
    blocks: [
      {
        type: "p",
        text: "[StoreDao] marks an interface. The generator emits an implementation that wraps IStoreCollection<T> and QueryAsync. CRUD method names map to the collection. [StoreRaw] calls QueryAsync. Placeholders are {parameterName}. Register services.AddMauiLocalStoreDao<T>() when you want the DAO in DI.",
      },
      {
        type: "code",
        code: `[StoreDao("users", typeof(Person))]
public interface IPersonDao
{
    Task<string> InsertAsync(Person item, CancellationToken cancellationToken = default);
    Task<Person?> FindByIdAsync(string id, CancellationToken cancellationToken = default);

    [StoreRaw(
        Sql = "SELECT * FROM users WHERE Age >= {minAge}",
        Nql = "db.users.find({ age: { $gte: {minAge} } })")]
    Task<IReadOnlyList<Person>> FindAdultsAsync(int minAge, CancellationToken cancellationToken = default);
}

var dao = store.GetDao<IPersonDao>();
var adults = await dao.FindAdultsAsync(21);`,
      },
    ],
  },
  {
    id: "not-in-scope",
    title: "What 1.1 does not do",
    blocks: [
      {
        type: "ul",
        items: [
          "Copy collections unless AutoMigrate (or MigrateAsync) and Map<T> are set",
          "Promote a JSON-fallback folder to a later native DuckDB / Firebird / RocksDB / LevelDB file without that migrate path",
          "Room-style schema migrations inside one engine",
          "SQL or NQL on engines whose QueryLanguage is None",
          "Sibling PackageReference to OfflineSync, JobQueue, or FileVault",
        ],
      },
    ],
  },
  {
    id: "version",
    title: "Platforms and version",
    blocks: [
      {
        type: "p",
        text: "Version 1.1.0. Library and sample share the OS TFMs: net10.0-android, net10.0-ios, net10.0-maccatalyst, plus net10.0-windows10.0.19041.0 when built on Windows. The library also packs net10.0 for tests and shared hosts.",
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Plugin.Maui.LocalStore",
        label: "Plugin.Maui.LocalStore on nuget.org",
      },
      {
        type: "link",
        href: "https://github.com/nuvyntralabs/Plugin.Maui.LocalStore",
        label: "Source on GitHub",
      },
    ],
  },
];

export const localStoreIntegrationSections: DocSection[] = [
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "code",
        code: "dotnet add package Plugin.Maui.LocalStore",
      },
      {
        type: "p",
        text: "Package ID: Plugin.Maui.LocalStore. Current package is 1.1.0 on nuget.org and GitHub Packages. Host registration is UseMauiLocalStore. Non-MAUI hosts can call services.AddMauiLocalStore(...) or LocalStore.Open(...).",
      },
      {
        type: "link",
        note: "Restore from GitHub Packages:",
        label: "Use nuvyntralabs GitHub Packages from a C# project",
        href: "/getting-started/github-packages/",
      },
    ],
  },
  {
    id: "poco",
    title: "Define a document",
    blocks: [
      {
        type: "code",
        code: `public sealed class Person
{
    public string? Id { get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string Status { get; set; } = "active";
    public string? City { get; set; }
}`,
      },
      {
        type: "p",
        text: "GetCollection creates the table or collection on first write. The same Person type works on every engine.",
      },
    ],
  },
  {
    id: "register",
    title: "Register",
    blocks: [
      {
        type: "code",
        code: `using Plugin.Maui.LocalStore;

builder
    .UseMauiApp<App>()
    .UseMauiLocalStore(o =>
    {
        o.Backend = StoreBackend.Sqlite;
        o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.db");
        o.CreateIfMissing = true;
    });

var store = LocalStore.Current; // Backend == StoreBackend.Sqlite
var users = store.GetCollection<Person>("users");`,
      },
      {
        type: "p",
        text: "Or without MAUI:",
      },
      {
        type: "code",
        code: `await using var store = LocalStore.Open(new LocalStoreOptions
{
    Backend = StoreBackend.Sqlite,
    Path = path
});`,
      },
      {
        type: "p",
        text: "Nuvexa is the default backend. Set EncryptionKey when you open an encrypted .nvx, SQLCipher file, LiteDB password, Realm file, or Firebird SYSDBA password. Store the key in SecureStorage — not in source.",
      },
      {
        type: "code",
        code: `builder.UseMauiLocalStore(o =>
{
    o.Backend = StoreBackend.Nuvexa;
    o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.nvx");
    o.EncryptionKey = key;
    o.CreateIfMissing = true;
    o.CacheSizeMb = 16;
});`,
      },
    ],
  },
  {
    id: "crud",
    title: "Create, read, update, delete",
    blocks: [
      {
        type: "p",
        text: "The Create / Read / Update / Delete / Select samples are the same methods on every engine. Only StoreBackend and the file path change.",
      },
      {
        type: "code",
        code: `var id = await users.InsertAsync(new Person
{
    Name = "Ada",
    Age = 36,
    Status = "active",
    City = "London"
});
// generated when Person.Id is null; written back onto the POCO

var ids = await users.InsertManyAsync(
[
    new Person { Name = "Grace", Age = 85, Status = "retired", City = "NewYork" },
    new Person { Name = "Cara", Age = 21, Status = "active", City = "Bengaluru" },
    new Person { Name = "Alan", Age = 42, Status = "active", City = "London" }
]);

var ada = await users.FindByIdAsync(id);
if (ada is null)
{
    return;
}

ada.Name = "Ada Lovelace";
await users.ReplaceAsync(ada); // requires a non-empty Id; missing id throws LocalStoreException

var removed = await users.DeleteByIdAsync(id);
// false when the id is not present`,
      },
    ],
  },
  {
    id: "select",
    title: "Select and index",
    blocks: [
      {
        type: "p",
        text: "FindAsync with no filter returns every row. StoreQuery.Limit of 0 means no limit. SQLite and DuckDB run this as SQL. Nuvexa maps POCO names to NQL paths (Age → age, Id → _id). Key-value engines filter in memory.",
      },
      {
        type: "code",
        code: `var all = await users.FindAsync();

var adults = await users.FindAsync(
    StoreFilter.Gte("Age", 21),
    new StoreQuery { SortBy = "Name", Limit = 20 });

var page2 = await users.FindAsync(
    StoreFilter.Gte("Age", 21),
    new StoreQuery { SortBy = "Name", Skip = 20, Limit = 20 });

var londonActive = await users.FindAsync(
    StoreFilter.And(
        StoreFilter.Eq("City", "London"),
        StoreFilter.Eq("Status", "active")),
    new StoreQuery { SortBy = "Age", SortDescending = true });

var youngOrNy = await users.FindAsync(
    StoreFilter.Or(
        StoreFilter.Lt("Age", 30),
        StoreFilter.Eq("City", "NewYork")));

var notRetired = await users.FindAsync(StoreFilter.Ne("Status", "retired"));

await users.EnsureIndexAsync("Age");
await users.EnsureIndexAsync("City", "Status");`,
      },
      {
        type: "table",
        headers: ["Filter", "Meaning"],
        rows: [
          ["StoreFilter.Eq(\"City\", \"London\")", "equal"],
          ["StoreFilter.Ne(\"Status\", \"retired\")", "not equal"],
          ["StoreFilter.Gte(\"Age\", 21)", "greater than or equal"],
          ["StoreFilter.Lt(\"Age\", 30)", "less than"],
          ["StoreFilter.And(...)", "all children"],
          ["StoreFilter.Or(...)", "any child"],
        ],
      },
    ],
  },
  {
    id: "raw-query",
    title: "Raw SQL / NQL",
    blocks: [
      {
        type: "p",
        text: "Check store.QueryLanguage before QueryAsync or ExecuteAsync. SQL engines take ? placeholders. Nuvexa takes NQL. Engines (and JSON fallbacks) with QueryLanguage.None throw LocalStoreException.",
      },
      {
        type: "code",
        code: `if (store.QueryLanguage == StoreQueryLanguage.Sql)
{
    await store.ExecuteAsync("UPDATE users SET Status = ? WHERE City = ?", ["active", "London"]);
    var adults = await store.QueryAsync<Person>("SELECT * FROM users WHERE Age >= ?", [21]);
}

if (store.QueryLanguage == StoreQueryLanguage.Nql)
{
    var adults = await store.QueryAsync<Person>(
        """db.users.find({ age: { $gte: 21 } }).sort({ name: 1 }).limit(20)""");
}`,
      },
    ],
  },
  {
    id: "migrate",
    title: "Migrate between engines",
    blocks: [
      {
        type: "p",
        text: "Dispose is not enough to copy data. Set AutoMigrate and Map<T> on the destination, or call LocalStore.MigrateAsync. Destination rows win when a mapped collection is already non-empty.",
      },
      {
        type: "code",
        code: `builder.UseMauiLocalStore(o =>
{
    o.Backend = StoreBackend.Nuvexa;
    o.Path = Path.Combine(FileSystem.AppDataDirectory, "app.nvx");
    o.EncryptionKey = key;
    o.AutoMigrate = true;
    o.MigrateFrom = StoreBackend.Sqlite;
    o.Map<Person>("users");
});`,
      },
    ],
  },
  {
    id: "dao",
    title: "Generated DAO",
    blocks: [
      {
        type: "p",
        text: "Mark an interface with [StoreDao]. CRUD names map to IStoreCollection<T>. [StoreRaw] runs QueryAsync. Resolve with store.GetDao<T>() or services.AddMauiLocalStoreDao<T>().",
      },
      {
        type: "code",
        code: `[StoreDao("users", typeof(Person))]
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
var dao = store.GetDao<IPersonDao>();
var adults = await dao.FindAdultsAsync(21);`,
      },
    ],
  },
  {
    id: "switch",
    title: "Switch engine",
    blocks: [
      {
        type: "p",
        text: "A new engine implements ILocalStore / IStoreCollection<T> and a StoreBackend value. Host code stays on the common methods. Dispose, then Open with the new backend and a different path. Data does not copy unless AutoMigrate + Map<T> (or MigrateAsync) is set. CreateIfMissing = false throws LocalStoreException when the file is missing.",
      },
      {
        type: "code",
        code: `await LocalStore.Current.DisposeAsync();
LocalStore.Open(new LocalStoreOptions
{
    Backend = StoreBackend.Sqlite, // or Nuvexa, Realm, LiteDb, DuckDb, SqlCipher, Firebird, Lmdb, RocksDb, LevelDb
    Path = Path.Combine(FileSystem.AppDataDirectory, "app.db")
});`,
      },
      {
        type: "callout",
        title: "SQLCipher needs its own file",
        text: "Do not reuse an unencrypted SQLite app.db as a SQLCipher path. Dispose, then open a different file (for example app-cipher.db).",
      },
    ],
  },
  {
    id: "sample",
    title: "Sample",
    blocks: [
      {
        type: "p",
        text: "samples/Plugin.Maui.LocalStore.Sample uses the same OS TFMs as the library. MauiProgram does not call UseMauiLocalStore — the Backend picker calls LocalStore.Open so you can walk every engine. A host app that uses one engine should register it with UseMauiLocalStore.",
      },
      {
        type: "p",
        text: "Use insert / update / delete / find by Id, FindAsync presets, Seed, Reset file, Contract tour, and Test all engines. The 1.1 buttons run Migrate SQLite → Nuvexa, raw QueryAsync (SQL or NQL), and the generated IPersonDao. Test migrate + DAO asserts those two flows. DuckDB, Firebird, and RocksDB pass on device via the JSON fallback (CRUD only; QueryLanguage is None).",
      },
      {
        type: "link",
        href: "https://github.com/nuvyntralabs/Plugin.Maui.LocalStore/tree/main/samples/Plugin.Maui.LocalStore.Sample",
        label: "MAUI sample on GitHub",
      },
    ],
  },
  {
    id: "siblings",
    title: "Compose with siblings",
    blocks: [
      {
        type: "p",
        text: "LocalStore does not reference OfflineSync, JobQueue, RetryQueue, or FileVault. Wire them yourself when the host already uses those plugins.",
      },
      {
        type: "table",
        headers: ["Need", "Package"],
        rows: [
          ["Local CRUD across engines", "Plugin.Maui.LocalStore"],
          ["Offline-first sync and conflicts", "Plugin.Maui.OfflineSync"],
          ["Durable job queue with retry / dead letter", "Plugin.Maui.JobQueue"],
          ["Retry failed operations", "Plugin.Maui.RetryQueue"],
          ["Encrypted local files", "Plugin.Maui.FileVault"],
          ["Direct NuvexaDB / NQL / Data Studio", "Nuventra.NuvexaDB"],
        ],
      },
    ],
  },
];

export const localStoreComparisonSections: DocSection[] = [
  {
    id: "versus-engine",
    title: "Versus a direct engine API",
    blocks: [
      {
        type: "p",
        text: "sqlite-net, Nuventra.NuvexaDB, Realm, LiteDB, and the other engines stay available. LocalStore is the host-selected adapter: one IStoreCollection<T> surface so application code does not take a dependency on SQL, NQL, or a vendor SDK. Use the engine package directly when you need that engine’s full surface.",
      },
      {
        type: "table",
        headers: ["Need", "LocalStore", "Direct engine"],
        rows: [
          ["Same CRUD if the backend changes", "Yes", "Rewrite the data layer"],
          ["SQL / NQL / Realm queries", "StoreFilter / StoreQuery; QueryAsync when QueryLanguage is Sql or Nql", "Full engine language"],
          ["Copy collections to another engine", "AutoMigrate + Map<T>, or MigrateAsync", "Write your own exporter"],
          ["Relationships / schema migrations", "Limited / none inside one engine", "Engine-specific"],
          ["Encrypted .nvx or SQLCipher", "EncryptionKey on options", "Engine-native APIs"],
          ["Nuvexa Data Studio / NQL update", "QueryAsync / INuvexaLocalStore", "Nuventra.NuvexaDB"],
        ],
      },
      {
        type: "callout",
        title: "Not a superiority table",
        text: "Prefer the engine SDK when the app is committed to one database and needs that vendor’s query language, relationships, or tooling. Prefer LocalStore when the host must pick SQLite today and keep the door open for NuvexaDB, Realm, or LiteDB without rewriting insert / find / replace / delete.",
      },
    ],
  },
  {
    id: "versus-room",
    title: "Versus Android Room",
    blocks: [
      {
        type: "p",
        text: "Room is a compile-time SQLite mapper for Android. LocalStore is not a Room port: [StoreDao] generates a facade over IStoreCollection<T>, [StoreRaw] is not @Query with compile-time SQL validation, and there are no automatic schema migrations inside one engine. The resemblance is the host-picks-the-engine / app-uses-one-API shape, plus optional generated DAOs.",
      },
      {
        type: "table",
        headers: ["Requirement", "LocalStore", "Android Room"],
        rows: [
          ["Host-selected engine", "Yes (10 backends)", "SQLite only"],
          ["Generated DAOs", "Yes ([StoreDao] / [StoreRaw])", "Yes (@Dao / @Query)"],
          ["Cross-platform MAUI", "Android, iOS, Mac Catalyst, Windows", "Android"],
          ["Copy between engines", "AutoMigrate + Map<T>", "N/A"],
          ["Schema migrations", "No automatic migration inside one engine", "Yes"],
        ],
      },
    ],
  },
  {
    id: "siblings",
    title: "Versus sibling persistence plugins",
    blocks: [
      {
        type: "table",
        headers: ["Need", "Start with"],
        rows: [
          ["Local documents / rows, host picks the engine", "Plugin.Maui.LocalStore"],
          ["Offline-first writes, queued sync, conflicts", "Plugin.Maui.OfflineSync"],
          ["Durable jobs, retry, dead letter", "Plugin.Maui.JobQueue"],
          ["Retry failed telemetry / orders / payments", "Plugin.Maui.RetryQueue"],
          ["Encrypted files (images, PDFs)", "Plugin.Maui.FileVault"],
          ["Embedded .nvx, NQL, Data Studio", "Nuventra.NuvexaDB"],
        ],
      },
      {
        type: "p",
        text: "OfflineSync is a sync engine. JobQueue is a durable task queue that happens to use SQLite. FileVault encrypts files, not collections. NuvexaDB is the document engine LocalStore can host — use it directly when you want Data Studio and the full NuvexaDatabase surface, not a Room-style facade.",
      },
      {
        type: "link",
        href: "/nuvexadb/",
        label: "NuvexaDB",
        note: "Embedded NoSQL engine that LocalStore can open as StoreBackend.Nuvexa.",
      },
      {
        type: "link",
        href: "/packages/plugin-maui-offline-sync/",
        label: "Plugin.Maui.OfflineSync",
        note: "Queued sync and conflicts — not a local CRUD API.",
      },
    ],
  },
  {
    id: "choose",
    title: "When to choose LocalStore",
    blocks: [
      {
        type: "ul",
        items: [
          "You want Room-style local CRUD on MAUI without writing SQL or NQL on the shared path.",
          "The host must pick SQLite, NuvexaDB, Realm, LiteDB, SQLCipher, or another shipped engine.",
          "You may later copy collections with AutoMigrate + Map<T>, or run QueryAsync / a generated DAO.",
          "You need Android, iOS, Mac Catalyst, and Windows on net10.0.",
          "You accept that some engines fall back to JSON files on mobile, and that QueryLanguage is None there.",
        ],
      },
      {
        type: "p",
        text: "Stay on the engine SDK when you already standardized on sqlite-net or NuvexaDB and need that query language. Use OfflineSync when the question is conflicted sync. Use JobQueue when the question is durable work. Use FileVault when the artifact is a file, not a row.",
      },
    ],
  },
];
