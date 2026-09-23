---
title: "HttpForge 1.1.1: A Source-Generated REST Client for .NET MAUI"
published: false
description: "Plugin.Maui.HttpForge 1.1.1 compiles a C# interface into an HttpClient. The 1.1 request surface covers query objects, streaming, and compression. Retry, cache, tokens, and resumable uploads stay on sibling plugins."
tags: dotnet, maui, http, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A ViewModel should call `GetUser(42)`. It should not assemble `HttpRequestMessage` by hand, and it should not discover a wrong route at runtime.

**Plugin.Maui.HttpForge** is that contract. Version **1.1.1** is on nuget.org. You declare GET, POST, PUT, DELETE, PATCH, and HEAD as a C# interface. A source generator emits the `HttpClient` implementation at compile time. There is no reflection request builder.

This post is the walkthrough: the 1.1 request surface (unchanged in 1.1.1), how to register a typed client, and where retry, cache, tokens, and resumable uploads attach on the same `IHttpClientBuilder`.

## What HttpForge is

HttpForge is the REST contract for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows. It targets `net10.0`, `net10.0-android` (API 21+), `net10.0-ios` and `net10.0-maccatalyst` (15+), and `net10.0-windows10.0.19041.0`.

It does one job: turn the interface into a client. Resilience, cache, session refresh, and chunked upload stay on their own packages and chain onto the builder `AddHttpForgeClient` returns.

| | |
| --- | --- |
| Package | [`Plugin.Maui.HttpForge`](https://www.nuget.org/packages/Plugin.Maui.HttpForge) 1.1.1 |
| Registration | `UseHttpForge` / `AddHttpForgeClient<T>` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.HttpForge](https://github.com/nuvyntralabs/Plugin.Maui.HttpForge) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-httpforge/](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| Guides | [Get started](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/integration/) · [How it works](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/docs/) |

1.1.1 is the current pack. The request surface shipped in 1.1.0. Unsupported shapes fail at compile time (`HFG001`–`HFG010`). A reflection fallback package is out of scope. Write that one method against `HttpClient` yourself.

## Declare the API

```csharp
public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUser(int id, CancellationToken cancellationToken = default);

    [Post("/users")]
    Task<User> CreateUser([Body] CreateUserRequest request);
}

var user = await api.GetUser(42);
```

| Piece | How |
| --- | --- |
| Methods | `[Get]`, `[Post]`, `[Put]`, `[Delete]`, `[Patch]`, `[Head]` |
| Path | `/users/{id}` matches `int id` or `[AliasAs("id")]`. `{id?}` is optional |
| Query | Leftover parameters, `[Query]`, query objects, collection formats, camel / snake / kebab keys |
| Flag with no value | `[QueryName]` writes `?archived` |
| JSON body | `[Body]`, or `[Body(BodySerializationMethod.JsonLines)]` |
| Headers | `[Headers("Accept: application/json")]`, `[Header("X-Request-Id")]` |
| Multipart | `[Multipart]` with `StreamPart`, `ByteArrayPart`, `FileInfoPart`, `[FormObject]` |
| Route extras | `[PathPrefix]`, `[Url]`, `[Timeout]` |
| Stream | `IAsyncEnumerable<T>` as JSON Lines or SSE |
| Compression | `RequestBodyCompression` / `[CompressRequest]` (gzip or brotli) |
| Token attach | `AuthorizationHeaderValueGetter` |
| Rich result | `Task<IApiResponse<T>>` — no throw on 4xx/5xx |

JSON defaults to `System.Text.Json`. A trimmed or AOT host can pass a `JsonSerializerContext`. Newtonsoft.Json and XML are optional packages, not part of the core nupkg. `XmlContentSerializer` prohibits DTD processing and sets `XmlResolver` to null.

`Task<T>` throws `ApiException` when the server returns 4xx or 5xx, and `ApiRequestException` when the transport fails (timeout, DNS, TLS). `Task<IApiResponse<T>>` returns status, headers, and body so the caller can branch.

## Register

```csharp
using Plugin.Maui.HttpForge;

builder
    .UseMauiApp<App>()
    .UseHttpForge();

builder.Services.AddHttpForgeClient<IUserApi>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});
```

Resolve `IUserApi` from DI. A console or test host can skip MAUI:

```csharp
var api = RestService.For<IUserApi>("https://api.example.com");
```

`AddHttpForgeClient<T>()` returns `IHttpClientBuilder`. That builder is where handlers attach. HttpForge itself does not reference ApiResilience, ApiCache, SecureSession, or SmartUpload, so a typed client still builds when those packages are absent.

## The 1.1 request surface

1.1.0 filled the Refit-shaped gaps from 1.0: query objects, collection formats, naming presets, timeouts, runtime URLs, path prefixes, optional segments, valueless query flags, form-object flattening, streaming, request compression, and a token attach hook.

```csharp
[PathPrefix("/api/v1")]
public interface IUserApi
{
    [Get("/users")]
    Task<List<User>> Search(
        [Query] UserQuery query,
        [Query(CollectionFormat.Multi)] int[] ages);

    [Get("/users/{id}/orders/{orderId?}")]
    [Timeout(5_000)]
    Task<List<Order>> GetOrders(int id, int? orderId);

    [Get("/events")]
    IAsyncEnumerable<Event> StreamEvents(CancellationToken cancellationToken);
}

settings.UrlParameterKeyFormatter = UrlParameterKeyFormatter.SnakeCase;
settings.AuthorizationHeaderValueGetter = (request, ct) => tokenStore.GetAccessTokenAsync(ct);
settings.RequestBodyCompression = RequestBodyCompression.Gzip;
```

`CollectionFormat` is `Multi`, `Csv`, `Ssv`, `Tsv`, or `Pipes`. `[Url]` replaces the method path with a runtime string or `Uri`. Validate that value before the call. `AuthorizationHeaderValueGetter` sees an absolute URI (`BaseAddress` plus the relative path) and attaches a header. A 401 refresh stays on SecureSession or ApiResilience.

Multipart is one POST:

```csharp
[Multipart]
[Post("/users/{id}/photo")]
Task UploadPhoto(int id, [AliasAs("file")] StreamPart file);

await api.UploadPhoto(7, new StreamPart(stream, "photo.jpg", "image/jpeg"));
```

`[FormObject]` flattens a C# object into form fields (`name`, `address.city`). `HFG008` fires when `[FormObject]` is used without `[Multipart]`. A file that must resume after process death belongs on [Plugin.Maui.SmartUpload](https://nuvyntralabs.github.io/packages/plugin-maui-smart-upload/). Keep HttpForge for the JSON around that file: create the asset, confirm completion.

## Chain the pipeline

`IHttpClientFactory` invokes handlers in reverse add order. Add resilience first, then cache, so a CacheFirst hit never enters retry. Register host options first, then attach each typed client.

```text
ViewModel
  → IUserApi (generated)
      → IHttpClientFactory
          → GET cache            (ApiCache, optional)
          → Auth / 401 refresh   (SecureSession or ApiResilience)
          → Retry / circuit      (ApiResilience or Polly)
          → HttpClient
```

```csharp
builder
    .UseMauiApp<App>()
    .UseHttpForge()
    .UseApiResilience(options =>
    {
        options.Retry.MaxRetryAttempts = 3;
        options.CircuitBreaker.BreakDuration = TimeSpan.FromSeconds(15);
        options.OfflineQueue.Enabled = true;
        options.TokenRefresh.Enabled = true;
    })
    .UseApiCache(options =>
    {
        options.DefaultExpiration = TimeSpan.FromMinutes(30);
        options.DefaultPolicy = CachePolicy.CacheFirst;
    });

builder.Services.AddSingleton<IAccessTokenProvider, AuthTokenProvider>();

builder.Services
    .AddHttpForgeClient<IUserApi>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com");
    })
    .AddApiResilience()
    .AddApiCache();
```

Cached responses include `X-ApiCache-Hit`, `X-ApiCache-Stale`, and `X-ApiCache-Policy`. After a local write, `await cache.InvalidateByPrefixAsync("/users")`. Calling `IApiCache.GetAsync` around the same HttpForge GET caches twice.

Pick one 401 path. SecureSession targets Android and iOS: store the refresh token, attach Bearer, retry once. On Mac Catalyst or Windows, use ApiResilience `IAccessTokenProvider` and leave SecureSession off that client. A login interface stays without the session handler. The business interface gets it.

```csharp
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
    .AddApiResilience();
```

When SecureSession owns 401, set `options.TokenRefresh.Enabled = false` on ApiResilience. Stacking both refresh loops on one client races the refresh.

An organization already on Polly can skip ApiResilience and call `.AddStandardResilienceHandler()` on the same builder. TLS pinning is [Plugin.Maui.TlsPin](https://nuvyntralabs.github.io/packages/plugin-maui-tls-pin/), fail-closed, on that handler chain.

## Optional packages

HttpForge alone is enough for a typed client. Add a sibling package only when the host needs it.

```bash
dotnet add package Plugin.Maui.HttpForge
dotnet add package Plugin.Maui.HttpForge.Testing
dotnet add package Plugin.Maui.HttpForge.NewtonsoftJson
dotnet add package Plugin.Maui.HttpForge.Xml
```

```csharp
var http = new StubHttp
{
    { Route.Get("/users/{id}"), Reply.With(new User { Id = 7, Name = "octocat" }) }
};

var api = http.CreateClient<IUserApi>("https://api.example.com");
var user = await api.GetUser(7);
await http.VerifyAllCalledAsync();
```

`settings.ContentSerializer = new NewtonsoftJsonContentSerializer()` or `new XmlContentSerializer()` swaps the body codec.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `HFG001`–`HFG010` at build | The interface shape is outside the generator. Change the contract, or write that call with `HttpClient`. |
| `HFG008` | `[FormObject]` needs `[Multipart]`. |
| `ApiException` | The server returned 4xx or 5xx. Switch the method to `Task<IApiResponse<T>>` when the caller should branch. |
| `ApiRequestException` | Timeout, DNS, or TLS. The response never arrived. Retry belongs on ApiResilience or Polly. |
| `[Url]` hits an unexpected host | Validate the runtime string before the call. |
| 401 refresh runs twice | One owner: `.AddSecureSession()` or ApiResilience `TokenRefresh`, not both. |
| GET is cached and then cached again | `.AddApiCache()` is already on the client. Skip `IApiCache.GetAsync` for those URLs. |
| A large upload dies with the process | `[Multipart]` is one POST. Use SmartUpload for the bytes and HttpForge for the JSON confirm. |
| SecureSession on Mac Catalyst or Windows | That plugin is Android and iOS. Use `IAccessTokenProvider` on ApiResilience. |

## Where HttpForge sits next to the other tools

| Need | Tool |
| --- | --- |
| Generated REST interface on MAUI | **HttpForge** — `Plugin.Maui.HttpForge` |
| Retry, circuit breaker, offline POST queue | [Plugin.Maui.ApiResilience](https://nuvyntralabs.github.io/packages/plugin-maui-api-resilience/) |
| GET CacheFirst / stale-while-revalidate | [Plugin.Maui.ApiCache](https://nuvyntralabs.github.io/packages/plugin-maui-api-cache/) |
| Tokens and a single 401 retry on Android and iOS | [Plugin.Maui.SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/) |
| Chunked upload that survives process death | [Plugin.Maui.SmartUpload](https://nuvyntralabs.github.io/packages/plugin-maui-smart-upload/) |
| The same idea on a wider framework matrix | [Refit](https://github.com/reactiveui/refit) |

Refit is the mature general-purpose client. HttpForge 1.1 matches the request surface teams usually need from Refit 15 — methods, query objects, multipart, `IApiResponse<T>`, streaming, compression, and an authorization header getter — and leaves DI inside the core package. Refit remains the default when the team already uses it, needs `Refit.Reflection`, or targets frameworks beyond this MAUI matrix. HttpForge is the client when the host should chain ApiResilience, ApiCache, SecureSession, and SmartUpload on one `IHttpClientBuilder`.

The ViewModel that calls `IUserApi` usually lives in [MVVMExpress](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/). [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) `init` includes HttpForge on a new MAUI host.

## Try it

```bash
dotnet add package Plugin.Maui.HttpForge
```

Register `UseHttpForge`, add `IUserApi` with a `BaseAddress`, and call `GetUser` from a ViewModel. For a test that never leaves the process, add `Plugin.Maui.HttpForge.Testing` and stub the route with `StubHttp`.

- NuGet: [Plugin.Maui.HttpForge](https://www.nuget.org/packages/Plugin.Maui.HttpForge)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.HttpForge](https://github.com/nuvyntralabs/Plugin.Maui.HttpForge)
- Get started: [nuvyntralabs.github.io/packages/plugin-maui-httpforge/integration/](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/integration/)
- Comparison: [nuvyntralabs.github.io/packages/plugin-maui-httpforge/comparison/](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/comparison/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
