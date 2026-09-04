import type { DocSection } from "@/content/mvvmexpress";

export const httpForgeSlug = "plugin-maui-httpforge";

export const httpForgeDocsHref = `/packages/${httpForgeSlug}/docs/`;
export const httpForgeIntegrationHref = `/packages/${httpForgeSlug}/integration/`;
export const httpForgeComparisonHref = `/packages/${httpForgeSlug}/comparison/`;

export const httpForgeTechnicalTitle = "How HttpForge works";
export const httpForgeTechnicalDescription =
  "A source-generated REST contract for .NET MAUI. Declare the API as a C# interface; the compiler emits the HttpClient implementation. Retry, cache, tokens, and resumable uploads stay on sibling plugins.";

export const httpForgeIntegrationTitle = "Get started with HttpForge";
export const httpForgeIntegrationDescription =
  "Install 1.0.1, register UseHttpForge, add a typed client, then optionally chain ApiResilience, ApiCache, SecureSession, or SmartUpload on the same IHttpClientBuilder.";

export const httpForgeComparisonTitle = "HttpForge vs Refit and sibling HTTP plugins";
export const httpForgeComparisonDescription =
  "Compare HttpForge with Refit, hand-written HttpClient, ApiResilience, ApiCache, SecureSession, and SmartUpload — and when to choose each.";

export const httpForgeTechnicalSections: DocSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    blocks: [
      {
        type: "p",
        text: "HttpForge is the contract layer. You declare HTTP REST as a C# interface. A source generator emits the HttpClient implementation at compile time — there is no runtime reflection request builder.",
      },
      {
        type: "code",
        code: `public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUser(int id, CancellationToken cancellationToken = default);

    [Post("/users")]
    Task<User> CreateUser([Body] CreateUserRequest request);
}

var user = await api.GetUser(42);`,
      },
      {
        type: "callout",
        title: "Not a networking suite",
        text: "HttpForge does not retry, cache, refresh tokens, or resume uploads. Those stay on Plugin.Maui.ApiResilience, Plugin.Maui.ApiCache, Plugin.Maui.SecureSession, and Plugin.Maui.SmartUpload. Chain them on the IHttpClientBuilder that AddHttpForgeClient returns.",
      },
    ],
  },
  {
    id: "registration",
    title: "Registration",
    blocks: [
      {
        type: "p",
        text: "UseHttpForge() is the MAUI host hook. AddHttpForgeClient<T>() registers the generated client with IHttpClientFactory and returns IHttpClientBuilder.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.HttpForge;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseHttpForge();

        builder.Services.AddHttpForgeClient<IUserApi>(client =>
        {
            client.BaseAddress = new Uri("https://api.example.com");
        });

        return builder.Build();
    }
}`,
      },
      {
        type: "p",
        text: "Resolve IUserApi from DI. Without the host:",
      },
      {
        type: "code",
        code: `var api = RestService.For<IUserApi>("https://api.example.com");`,
      },
    ],
  },
  {
    id: "contract",
    title: "Contract surface",
    blocks: [
      {
        type: "table",
        headers: ["Feature", "How"],
        rows: [
          ["HTTP methods", "[Get], [Post], [Put], [Delete], [Patch], [Head]"],
          ["Path parameters", "/users/{id} matches int id or [AliasAs(\"id\")]"],
          ["Query parameters", "Remaining parameters, or [Query] / [Query(\"q\")]"],
          ["JSON body", "[Body]"],
          ["Headers", "[Headers(\"Accept: application/json\")], [Header(\"X-Request-Id\")]"],
          ["Multipart", "[Multipart] with StreamPart, ByteArrayPart, FileInfoPart"],
          ["Cancellation", "CancellationToken"],
          ["Rich response", "Task<IApiResponse<T>> (no throw on 4xx/5xx)"],
          ["Errors", "ApiException (HTTP response), ApiRequestException (transport)"],
          ["JSON", "System.Text.Json (optional JsonSerializerContext for AOT)"],
        ],
      },
      {
        type: "p",
        text: "Unsupported shapes fail at compile time (HFG001–HFG006). HttpForge is generated-only — there is no reflection fallback package.",
      },
    ],
  },
  {
    id: "multipart",
    title: "Multipart",
    blocks: [
      {
        type: "code",
        code: `[Multipart]
[Post("/users/{id}/photo")]
Task UploadPhoto(int id, [AliasAs("file")] StreamPart file);

await api.UploadPhoto(7, new StreamPart(stream, "photo.jpg", "image/jpeg"));`,
      },
      {
        type: "callout",
        title: "Single POST, not resume",
        text: "HttpForge multipart is one request. For chunked resume after process death, use Plugin.Maui.SmartUpload for the bytes and keep HttpForge for the JSON around the file (create asset, confirm completion).",
      },
    ],
  },
  {
    id: "errors",
    title: "Errors and rich responses",
    blocks: [
      {
        type: "p",
        text: "A Task<T> method throws ApiException when the server returns 4xx/5xx, and ApiRequestException when the transport fails (timeout, DNS, TLS). Task<IApiResponse<T>> does not throw on HTTP error status — inspect the response instead.",
      },
      {
        type: "ul",
        items: [
          "ApiException — an HTTP response arrived and was not success.",
          "ApiRequestException — the request never completed as an HTTP response.",
          "IApiResponse<T> — status, headers, and deserialized body without throwing on 4xx/5xx.",
        ],
      },
    ],
  },
  {
    id: "json-aot",
    title: "JSON and AOT",
    blocks: [
      {
        type: "p",
        text: "The default serializer is System.Text.Json. Hosts that trim or publish AOT can supply a JsonSerializerContext. Hosts can also swap IHttpContentSerializer. Newtonsoft.Json and XML are not in the core package.",
      },
    ],
  },
  {
    id: "not-in-v1",
    title: "Not in v1",
    blocks: [
      {
        type: "p",
        text: "HttpForge 1.0.x is a focused subset. These Refit surfaces are not in v1 — they are roadmap items, not bugs.",
      },
      {
        type: "table",
        headers: ["Missing", "Direction"],
        rows: [
          ["Query objects, collection formats, camel/snake/kebab", "Next contract increment"],
          ["[Timeout], [Url], [PathPrefix], optional route segments", "Next contract increment"],
          ["[QueryName] valueless flags, [FormObject]", "Next contract increment"],
          ["SSE / IAsyncEnumerable / JSON Lines", "Later — streaming"],
          ["Request-body compression", "Later — transport convenience"],
          ["Authorization header value getter", "Later, or keep composing SecureSession / ApiResilience"],
          ["Newtonsoft.Json / XML packages", "Optional packages only if hosts need them"],
          ["Reflection fallback", "Not planned — stay generated-only"],
          ["First-party stub testing package", "Later — HttpForge.Testing"],
        ],
      },
      {
        type: "callout",
        title: "Retry and cache are not on this list",
        text: "Those stay in sibling plugins. Do not expect [Retry] or cache attributes on the HttpForge interface.",
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms and version",
    blocks: [
      {
        type: "p",
        text: "Version 1.0.1. Target frameworks: net10.0, net10.0-android (API 21+), net10.0-ios (iOS 15+), net10.0-maccatalyst (15+), and net10.0-windows10.0.19041.0 (Windows 10.0.17763+). CI packs the Windows TFM on windows-latest and merges it into the nupkg published from macOS.",
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Plugin.Maui.HttpForge",
        label: "Plugin.Maui.HttpForge on NuGet",
      },
      {
        type: "link",
        href: "https://github.com/nuvyntralabs/Plugin.Maui.HttpForge",
        label: "Source on GitHub",
      },
    ],
  },
];

export const httpForgeIntegrationSections: DocSection[] = [
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "code",
        code: "dotnet add package Plugin.Maui.HttpForge",
      },
      {
        type: "p",
        text: "Package ID: Plugin.Maui.HttpForge. Current NuGet is 1.0.1. Install only the sibling plugins the host actually needs — HttpForge alone is enough for a typed client.",
      },
    ],
  },
  {
    id: "quick-start",
    title: "Quick start",
    blocks: [
      {
        type: "code",
        code: `using Plugin.Maui.HttpForge;

builder
    .UseMauiApp<App>()
    .UseHttpForge();

builder.Services.AddHttpForgeClient<IUserApi>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});`,
      },
      {
        type: "p",
        text: "Resolve IUserApi from DI and call the interface. Without the MAUI host, use RestService.For<IUserApi>(\"https://api.example.com\").",
      },
    ],
  },
  {
    id: "pipeline",
    title: "Pipeline",
    blocks: [
      {
        type: "p",
        text: "AddHttpForgeClient<T>() returns IHttpClientBuilder. That is the composition point for DelegatingHandlers and Microsoft HTTP pipelines.",
      },
      {
        type: "code",
        code: `ViewModel
    → IUserApi (HttpForge-generated)
        → IHttpClientFactory
            → GET cache               (ApiCache handler, optional)
            → Auth / 401 refresh      (SecureSession or ApiResilience)
            → Retry / circuit / queue (ApiResilience or Polly)
            → HttpClient
                → HTTPS API`,
      },
      {
        type: "p",
        text: "IHttpClientFactory invokes handlers in reverse add order. Add resilience first, then cache, so a CacheFirst hit never enters retry. Register host options first (UseHttpForge, UseApiResilience, UseSecureSession, UseApiCache, UseSmartUpload), then attach each typed client.",
      },
      {
        type: "table",
        headers: ["Need", "Compose", "Alternative"],
        rows: [
          ["Retry, circuit breaker, offline POST queue", "ApiResilience", "Polly / Microsoft.Extensions.Http.Resilience"],
          ["GET response cache (CacheFirst / SWR)", "ApiCache", "Host-owned cache"],
          ["Tokens / 401 refresh", "SecureSession or ApiResilience", "MSAL / Auth0 / host-owned handler"],
          ["Chunked resume after process death", "SmartUpload", "tus / host-owned chunks"],
        ],
      },
    ],
  },
  {
    id: "api-resilience",
    title: "ApiResilience — retry, circuit, offline queue, 401",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.ApiResilience wraps the same HttpClient the generated client uses. Do not implement retry inside the HttpForge interface.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.ApiResilience;
using Plugin.Maui.HttpForge;

builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseApiResilience(options =>
    {
        options.Retry.MaxRetryAttempts = 3;
        options.CircuitBreaker.BreakDuration = TimeSpan.FromSeconds(15);
        options.OfflineQueue.Enabled = true;
        options.TokenRefresh.Enabled = true;
    });

builder.Services.AddSingleton<IAccessTokenProvider, AuthTokenProvider>();

builder.Services
    .AddHttpForgeClient<IUserApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    })
    .AddApiResilience();`,
      },
      {
        type: "p",
        text: "If the org already standardized on Polly or Microsoft resilience:",
      },
      {
        type: "code",
        code: `builder.Services
    .AddHttpForgeClient<IUserApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    })
    .AddStandardResilienceHandler();`,
      },
    ],
  },
  {
    id: "api-cache",
    title: "ApiCache — GET CacheFirst / SWR",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.ApiCache remembers GET responses. Attach the handler to the typed client. Do not also call IApiCache.GetAsync for those same URLs or you will cache twice.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.ApiCache;
using Plugin.Maui.ApiResilience;
using Plugin.Maui.HttpForge;

builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseApiResilience()
    .UseApiCache(options =>
    {
        options.DefaultExpiration = TimeSpan.FromMinutes(30);
        options.DefaultPolicy = CachePolicy.CacheFirst;
    });

builder.Services
    .AddHttpForgeClient<IUserApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    })
    .AddApiResilience()
    .AddApiCache();`,
      },
      {
        type: "p",
        text: "IUserApi.GetUser(id) then goes through CacheFirst (or the configured policy). Cached responses include X-ApiCache-Hit, X-ApiCache-Stale, and X-ApiCache-Policy. IApiCache.GetAsync is the path-based entry point when there is no typed interface. Invalidate after a local write:",
      },
      {
        type: "code",
        code: `await cache.InvalidateByPrefixAsync("/users");`,
      },
      {
        type: "p",
        text: "Offline-first writes stay on OfflineSync, not ApiCache.",
      },
    ],
  },
  {
    id: "secure-session",
    title: "SecureSession — tokens and session lock",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.SecureSession stores access/refresh tokens (via SecureStoragePlus), attaches Bearer, and retries once on 401. HttpForge does not attach Authorization by itself in v1. SecureSession targets Android and iOS. On Mac Catalyst or Windows, use ApiResilience IAccessTokenProvider instead.",
      },
      {
        type: "p",
        text: "Register a login client without the session handler, and the business client with it. Pick one 401 path — do not stack AddSecureSession() and ApiResilience token refresh on the same client.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.ApiResilience;
using Plugin.Maui.HttpForge;
using Plugin.Maui.SecureSession;

builder.Services.AddSingleton<IAuthGateway, ShopAuthGateway>();

builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseSecureSession(options =>
    {
        options.AccessTokenRefreshSkew = TimeSpan.FromSeconds(60);
        options.AcceptUnvalidatedTokens = false;
    })
    .UseApiResilience(options =>
    {
        options.TokenRefresh.Enabled = false;
        options.OfflineQueue.Enabled = true;
    });

builder.Services
    .AddHttpForgeClient<IAuthApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    });

builder.Services
    .AddHttpForgeClient<IUserApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    })
    .AddSecureSession()
    .AddApiResilience();`,
      },
      {
        type: "table",
        headers: ["Host", "Token handler", "ApiResilience TokenRefresh"],
        rows: [
          ["Android / iOS with SecureSession", ".AddSecureSession()", "Off"],
          ["Any HttpForge TFM without SecureSession", "IAccessTokenProvider", "On"],
          ["Already on MSAL / Auth0", "That SDK's handler", "Off"],
        ],
      },
      {
        type: "callout",
        title: "AppLock is not a token store",
        text: "GetAccessTokenAsync() also refreshes proactively inside the skew window. AppLock locks the UI. SecureSession locks tokens. They are not substitutes.",
      },
    ],
  },
  {
    id: "smart-upload",
    title: "SmartUpload — resumable files",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.SmartUpload owns chunked upload, retry, and process-death resume. HttpForge [Multipart] / StreamPart is a single POST. Use HttpForge for the JSON API around the file. Use SmartUpload for the bytes when the file must survive a kill.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.HttpForge;
using Plugin.Maui.SmartUpload;

builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseSmartUpload(options =>
    {
        options.RequireHttps = true;
        options.ResumeInterruptedOnStart = true;
        options.DefaultChunkSize = 512 * 1024;
    });

builder.Services.AddHttpForgeClient<IMediaApi>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});`,
      },
      {
        type: "code",
        code: `public interface IMediaApi
{
    [Post("/assets/{id}/complete")]
    Task Confirm(string id, CancellationToken cancellationToken = default);
}

var session = await uploads.EnqueueAsync(new UploadRequest
{
    FilePath = photoPath,
    Endpoint = new Uri("https://api.example.com/uploads"),
    Protocol = UploadProtocolKind.Tus,
    Headers =
    {
        ["Authorization"] = $"Bearer {accessToken}"
    }
});

uploads.SessionCompleted += async (_, e) =>
{
    await mediaApi.Confirm(e.Session.SessionId);
};`,
      },
      {
        type: "p",
        text: "Do not set RequireHttps = false unless the host explicitly asked for http://.",
      },
    ],
  },
  {
    id: "order",
    title: "Suggested registration order",
    blocks: [
      {
        type: "code",
        code: `builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseSecureSession(...)
    .UseApiResilience(...)
    .UseApiCache(...)
    .UseSmartUpload(...);

builder.Services
    .AddHttpForgeClient<IAuthApi>(c => c.BaseAddress = new Uri("https://api.example.com"));

builder.Services
    .AddHttpForgeClient<IUserApi>(c => c.BaseAddress = new Uri("https://api.example.com"))
    .AddSecureSession()
    .AddApiResilience()
    .AddApiCache();`,
      },
    ],
  },
  {
    id: "do-not-wire",
    title: "What not to wire",
    blocks: [
      {
        type: "table",
        headers: ["Temptation", "Why not"],
        rows: [
          ["Retry attributes on the HttpForge interface", "Resilience belongs on the handler pipeline"],
          ["IApiCache.GetAsync around an HttpForge GET", "Double-caches when .AddApiCache() is already on the client"],
          [".AddSecureSession() and ApiResilience token refresh together", "Two 401 refresh loops"],
          ["Authorization getter inside HttpForge", "Use SecureSession or ApiResilience"],
          ["[Multipart] for multi-megabyte resume", "Use SmartUpload"],
          ["SecureSession on Mac Catalyst / Windows", "That plugin is Android + iOS"],
          ["Observability just to “see HTTP”", "Use ILogger or Diagnostics breadcrumbs if you already have them"],
          ["Package reference from HttpForge → those siblings", "Keeps the REST client usable without the suite"],
        ],
      },
    ],
  },
];

export const httpForgeComparisonSections: DocSection[] = [
  {
    id: "versus-refit",
    title: "Versus Refit",
    blocks: [
      {
        type: "p",
        text: "Both libraries use the same idea: declare a REST API as a C# interface, generate the HttpClient implementation, and leave transport to the standard .NET HTTP stack. Refit is the mature, general-purpose client. HttpForge is a MauiEssentials-shaped subset for Android, iOS, Mac Catalyst, and Windows. It is not a drop-in Refit replacement.",
      },
      {
        type: "table",
        headers: ["", "HttpForge", "Refit"],
        rows: [
          ["Manual", "RestService.For<T>(http)", "RestService.For<T>(http)"],
          ["DI", "AddHttpForgeClient<T>(...)", "AddRefitClient<T>()"],
          ["MAUI host", "UseHttpForge()", "No MAUI-specific host API"],
        ],
      },
      {
        type: "table",
        headers: ["Capability", "HttpForge 1.0.1", "Refit 15"],
        rows: [
          ["Interface + [Get]/[Post]/[Put]/[Delete]/[Patch]/[Head]", "Yes", "Yes"],
          ["Path, [AliasAs], [Query], [Body], [Header]/[Headers]", "Yes", "Yes"],
          ["Multipart (StreamPart / ByteArrayPart / FileInfoPart)", "Yes", "Yes"],
          ["CancellationToken", "Yes", "Yes"],
          ["Task<IApiResponse<T>>", "Yes", "Yes"],
          ["HTTP vs transport exceptions", "ApiException / ApiRequestException", "ApiException / ApiRequestException"],
          ["Source-generated client and request construction", "Yes", "Yes (Refit 14+)"],
          ["Compile-time diagnostics", "HFG001–HFG006", "Yes (richer analyzer set)"],
          ["System.Text.Json + JsonSerializerContext / AOT", "Yes", "Yes"],
          ["IHttpClientFactory + DelegatingHandler", "Yes", "Yes (Refit.HttpClientFactory)"],
          ["Query objects, collection formats, naming presets", "No (v1)", "Yes"],
          ["[Timeout], [Url], [PathPrefix], optional segments", "No (v1)", "Yes"],
          ["SSE / IAsyncEnumerable / JSON Lines", "No (v1)", "Yes"],
          ["Authorization header value getter", "No (v1)", "Yes"],
          ["Newtonsoft.Json / XML / reflection fallback", "No", "Yes (optional packages)"],
          ["First-party stub testing package", "No (v1)", "Refit.Testing"],
          ["Retry / cache / tokens / resume", "Compose sibling plugins", "Host-owned"],
          ["Target matrix", "net10.0 + Android / iOS / Mac Catalyst / Windows", "Broader (.NET 8–11, WinUI, Blazor, Uno, .NET Framework)"],
        ],
      },
      {
        type: "callout",
        title: "Not a superiority table",
        text: "Refit is the right default when the team already uses it, needs query-object formatting, streaming, Newtonsoft/XML, or a reflection fallback. Prefer HttpForge when you want a generated client that matches the MauiEssentials catalog and chains with those plugins on IHttpClientBuilder.",
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Refit",
        label: "Refit on NuGet",
        note: "Mature general-purpose typed REST client.",
      },
    ],
  },
  {
    id: "siblings",
    title: "Versus sibling HTTP plugins",
    blocks: [
      {
        type: "table",
        headers: ["Need", "Start with"],
        rows: [
          ["Typed REST in a MauiEssentials app", "Plugin.Maui.HttpForge"],
          ["Already on Refit, or need Refit’s full surface", "Refit"],
          ["A few HttpClient calls", "Hand-written HttpClient"],
          ["Retry / circuit / offline POST queue", "Plugin.Maui.ApiResilience"],
          ["CacheFirst / SWR GET cache", "Plugin.Maui.ApiCache"],
          ["Tokens / 401 refresh", "Plugin.Maui.SecureSession or ApiResilience"],
          ["Resumable upload", "Plugin.Maui.SmartUpload"],
        ],
      },
      {
        type: "p",
        text: "HttpForge keeps the declarative contract and source generation. It leaves mobile networking problems to sibling packages instead of embedding retry, cache, offline queue, or upload resume in the REST DSL.",
      },
    ],
  },
  {
    id: "choose",
    title: "When to choose HttpForge",
    blocks: [
      {
        type: "ul",
        items: [
          "You want a Refit-style typed REST client that matches the MauiEssentials catalog.",
          "You need Android, iOS, Mac Catalyst, and Windows on net10.0.",
          "You want IHttpClientBuilder composition with ApiResilience, ApiCache, SecureSession, or SmartUpload.",
          "You prefer compile-time failure (HFG00x) over a reflection fallback.",
        ],
      },
      {
        type: "p",
        text: "Stay on Refit when the team already standardized on it, or when you need query objects, streaming, Newtonsoft/XML, or Refit.Testing. Use hand-written HttpClient for a handful of calls. Use sibling plugins when the question is retry, cache, tokens, or resume — not the REST contract.",
      },
    ],
  },
];
