/** GitHub repo IDs for component comment threads. Do not use the website repo. */

export type CommentRepo = {
  repo: string;
  repoId: string;
  hasIssues: boolean;
  giscus?: {
    category: string;
    categoryId: string;
  };
};

export const commentRepos: Record<string, CommentRepo> = {
  "nuvyntralabs/AssureCars": {
    repo: "nuvyntralabs/AssureCars",
    repoId: "R_kgDOTV3ILA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOTV3ILM4DEcrv",
    },
  },
  "nuvyntralabs/BluetoothMICRecording": {
    repo: "nuvyntralabs/BluetoothMICRecording",
    repoId: "R_kgDOSzdJ3Q",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOSzdJ3c4DEcrj",
    },
  },
  "nuvyntralabs/FileProcessorTest": {
    repo: "nuvyntralabs/FileProcessorTest",
    repoId: "R_kgDOQXVZtA",
    hasIssues: true,
  },
  "nuvyntralabs/GPSSensorTrackingService": {
    repo: "nuvyntralabs/GPSSensorTrackingService",
    repoId: "R_kgDOSzcxWA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOSzcxWM4DEcrp",
    },
  },
  "nuvyntralabs/HtmlLabelPlugin": {
    repo: "nuvyntralabs/HtmlLabelPlugin",
    repoId: "R_kgDOIO6Urw",
    hasIssues: false,
  },
  "nuvyntralabs/LocatinTrackingJobScheduler-XamarinAndroid": {
    repo: "nuvyntralabs/LocatinTrackingJobScheduler-XamarinAndroid",
    repoId: "R_kgDOGaujvA",
    hasIssues: true,
  },
  "nuvyntralabs/MauiEssentials": {
    repo: "nuvyntralabs/MauiEssentials",
    repoId: "R_kgDOUGYUIg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGYUIs4DEcr7",
    },
  },
  "nuvyntralabs/Online_Conference": {
    repo: "nuvyntralabs/Online_Conference",
    repoId: "R_kgDOTOc63w",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOTOc6384DEcqh",
    },
  },
  "nuvyntralabs/Plugin.FirebaseAnalytics": {
    repo: "nuvyntralabs/Plugin.FirebaseAnalytics",
    repoId: "R_kgDOIfLMVg",
    hasIssues: false,
  },
  "nuvyntralabs/Plugin.Maui.ApiCache": {
    repo: "nuvyntralabs/Plugin.Maui.ApiCache",
    repoId: "R_kgDOUHyQ2w",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHyQ284DEcwV",
    },
  },
  "nuvyntralabs/Plugin.Maui.ApiResilience": {
    repo: "nuvyntralabs/Plugin.Maui.ApiResilience",
    repoId: "R_kgDOUGVG1A",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGVG1M4DEcwP",
    },
  },
  "nuvyntralabs/Plugin.Maui.AppHealth": {
    repo: "nuvyntralabs/Plugin.Maui.AppHealth",
    repoId: "R_kgDOUGRu8Q",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGRu8c4DEcwD",
    },
  },
  "nuvyntralabs/Plugin.Maui.AppLock": {
    repo: "nuvyntralabs/Plugin.Maui.AppLock",
    repoId: "R_kgDOUHvQTA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHvQTM4DEcv9",
    },
  },
  "nuvyntralabs/Plugin.Maui.AppUpdate": {
    repo: "nuvyntralabs/Plugin.Maui.AppUpdate",
    repoId: "R_kgDOUHDpTw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHDpT84DEcvx",
    },
  },
  "nuvyntralabs/Plugin.Maui.BackgroundTasks": {
    repo: "nuvyntralabs/Plugin.Maui.BackgroundTasks",
    repoId: "R_kgDOUGK5CQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGK5Cc4DEcvr",
    },
  },
  "nuvyntralabs/Plugin.Maui.BluetoothManager": {
    repo: "nuvyntralabs/Plugin.Maui.BluetoothManager",
    repoId: "R_kgDOUHfXeA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHfXeM4DEcvl",
    },
  },
  "nuvyntralabs/Plugin.Maui.ClipboardPlus": {
    repo: "nuvyntralabs/Plugin.Maui.ClipboardPlus",
    repoId: "R_kgDOUHgLfw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHgLf84DEcvf",
    },
  },
  "nuvyntralabs/Plugin.Maui.CommunityToolkitPlus": {
    repo: "nuvyntralabs/Plugin.Maui.CommunityToolkitPlus",
    repoId: "R_kgDOUJgpHg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUJgpHs4DEmPx",
    },
  },
  "nuvyntralabs/Plugin.Maui.DeepLinks": {
    repo: "nuvyntralabs/Plugin.Maui.DeepLinks",
    repoId: "R_kgDOUG2-Gw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG2-G84DEcvZ",
    },
  },
  "nuvyntralabs/Plugin.Maui.DeviceInfoPlus": {
    repo: "nuvyntralabs/Plugin.Maui.DeviceInfoPlus",
    repoId: "R_kgDOUHsFtw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHsFt84DEcvT",
    },
  },
  "nuvyntralabs/Plugin.Maui.DeviceOrientationPlus": {
    repo: "nuvyntralabs/Plugin.Maui.DeviceOrientationPlus",
    repoId: "R_kgDOUH3Ikg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUH3Iks4DEcvM",
    },
  },
  "nuvyntralabs/Plugin.Maui.DeviceSession": {
    repo: "nuvyntralabs/Plugin.Maui.DeviceSession",
    repoId: "R_kgDOUGNTcQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGNTcc4DEcvB",
    },
  },
  "nuvyntralabs/Plugin.Maui.Diagnostics": {
    repo: "nuvyntralabs/Plugin.Maui.Diagnostics",
    repoId: "R_kgDOUG07Zw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG07Z84DEcu7",
    },
  },
  "nuvyntralabs/Plugin.Maui.FeatureFlags": {
    repo: "nuvyntralabs/Plugin.Maui.FeatureFlags",
    repoId: "R_kgDOUG1Hhw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG1Hh84DEcuv",
    },
  },
  "nuvyntralabs/Plugin.Maui.FileVault": {
    repo: "nuvyntralabs/Plugin.Maui.FileVault",
    repoId: "R_kgDOUGWVnA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGWVnM4DEcup",
    },
  },
  "nuvyntralabs/Plugin.Maui.FormValidation": {
    repo: "nuvyntralabs/Plugin.Maui.FormValidation",
    repoId: "R_kgDOUHzsow",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHzso84DEcuj",
    },
  },
  "nuvyntralabs/Plugin.Maui.GeoLocator": {
    repo: "nuvyntralabs/Plugin.Maui.GeoLocator",
    repoId: "R_kgDOUF926A",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUF926M4DEcud",
    },
  },
  "nuvyntralabs/Plugin.Maui.HttpForge": {
    repo: "nuvyntralabs/Plugin.Maui.HttpForge",
    repoId: "R_kgDOUOKRKA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUOKRKM4DE3iC",
    },
  },
  "nuvyntralabs/Plugin.Maui.JobQueue": {
    repo: "nuvyntralabs/Plugin.Maui.JobQueue",
    repoId: "R_kgDOUHCOGg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHCOGs4DEcuR",
    },
  },
  "nuvyntralabs/Plugin.Maui.KeyboardManager": {
    repo: "nuvyntralabs/Plugin.Maui.KeyboardManager",
    repoId: "R_kgDOUH2NbQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUH2Nbc4DEcuF",
    },
  },
  "nuvyntralabs/Plugin.Maui.LeakAnalyser": {
    repo: "nuvyntralabs/Plugin.Maui.LeakAnalyser",
    repoId: "R_kgDOUN_whg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUN_whs4DE2Ru",
    },
  },
  "nuvyntralabs/Plugin.Maui.MVVMExpress": {
    repo: "nuvyntralabs/Plugin.Maui.MVVMExpress",
    repoId: "R_kgDOUJ_voQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUJ_voc4DEmPr",
    },
  },
  "nuvyntralabs/Plugin.Wpf.MVVMExpress": {
    repo: "nuvyntralabs/Plugin.Wpf.MVVMExpress",
    repoId: "R_kgDOUTFtQg",
    hasIssues: true,
  },
  "nuvyntralabs/Plugin.Avalonia.MVVMExpress": {
    repo: "nuvyntralabs/Plugin.Avalonia.MVVMExpress",
    repoId: "R_kgDOUTvdfQ",
    hasIssues: true,
  },
  "nuvyntralabs/Plugin.Uno.MVVMExpress": {
    repo: "nuvyntralabs/Plugin.Uno.MVVMExpress",
    repoId: "R_kgDOUTveiQ",
    hasIssues: true,
  },
  "nuvyntralabs/Plugin.WinUI.MVVMExpress": {
    repo: "nuvyntralabs/Plugin.WinUI.MVVMExpress",
    repoId: "R_kgDOUTvZmA",
    hasIssues: true,
  },
  "nuvyntralabs/Plugin.Maui.MediaPipeline": {
    repo: "nuvyntralabs/Plugin.Maui.MediaPipeline",
    repoId: "R_kgDOUG7IKw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG7IK84DEct_",
    },
  },
  "nuvyntralabs/Plugin.Maui.NetworkDiagnostics": {
    repo: "nuvyntralabs/Plugin.Maui.NetworkDiagnostics",
    repoId: "R_kgDOUHxStQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHxStc4DEctz",
    },
  },
  "nuvyntralabs/Plugin.Maui.NetworkMonitor": {
    repo: "nuvyntralabs/Plugin.Maui.NetworkMonitor",
    repoId: "R_kgDOUGHEJA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGHEJM4DEctn",
    },
  },
  "nuvyntralabs/Plugin.Maui.NfcPlus": {
    repo: "nuvyntralabs/Plugin.Maui.NfcPlus",
    repoId: "R_kgDOUHt88A",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHt88M4DEcth",
    },
  },
  "nuvyntralabs/Plugin.Maui.Observability": {
    repo: "nuvyntralabs/Plugin.Maui.Observability",
    repoId: "R_kgDOUHAY5w",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHAY584DEctb",
    },
  },
  "nuvyntralabs/Plugin.Maui.OfflineSync": {
    repo: "nuvyntralabs/Plugin.Maui.OfflineSync",
    repoId: "R_kgDOUGN6zw",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGN6z84DEctV",
    },
  },
  "nuvyntralabs/Plugin.Maui.Performance": {
    repo: "nuvyntralabs/Plugin.Maui.Performance",
    repoId: "R_kgDOUG4iKA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG4iKM4DEctP",
    },
  },
  "nuvyntralabs/Plugin.Maui.PermissionFlow": {
    repo: "nuvyntralabs/Plugin.Maui.PermissionFlow",
    repoId: "R_kgDOUGQr2Q",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGQr2c4DEctD",
    },
  },
  "nuvyntralabs/Plugin.Maui.Printing": {
    repo: "nuvyntralabs/Plugin.Maui.Printing",
    repoId: "R_kgDOUH1JeA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUH1JeM4DEcs6",
    },
  },
  "nuvyntralabs/Plugin.Maui.PushRouter": {
    repo: "nuvyntralabs/Plugin.Maui.PushRouter",
    repoId: "R_kgDOUGPh2w",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGPh284DEcsx",
    },
  },
  "nuvyntralabs/Plugin.Maui.RetryQueue": {
    repo: "nuvyntralabs/Plugin.Maui.RetryQueue",
    repoId: "R_kgDOUH0cMQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUH0cMc4DEcsr",
    },
  },
  "nuvyntralabs/Plugin.Maui.SecureSession": {
    repo: "nuvyntralabs/Plugin.Maui.SecureSession",
    repoId: "R_kgDOUG5vmg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUG5vms4DEcsf",
    },
  },
  "nuvyntralabs/Plugin.Maui.SecureStoragePlus": {
    repo: "nuvyntralabs/Plugin.Maui.SecureStoragePlus",
    repoId: "R_kgDOUGTtDQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGTtDc4DEcsT",
    },
  },
  "nuvyntralabs/Plugin.Maui.SharePlus": {
    repo: "nuvyntralabs/Plugin.Maui.SharePlus",
    repoId: "R_kgDOUHrhKQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUHrhKc4DEcsN",
    },
  },
  "nuvyntralabs/Plugin.Maui.SmartUpload": {
    repo: "nuvyntralabs/Plugin.Maui.SmartUpload",
    repoId: "R_kgDOUGMWiA",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGMWiM4DEbh7",
    },
  },
  "nuvyntralabs/Plugin.Maui.VoipCore": {
    repo: "nuvyntralabs/Plugin.Maui.VoipCore",
    repoId: "R_kgDOUGXB2Q",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUGXB2c4DEcsB",
    },
  },
  "nuvyntralabs/Twilio.Voice.Android.XamarinBinding": {
    repo: "nuvyntralabs/Twilio.Voice.Android.XamarinBinding",
    repoId: "MDEwOlJlcG9zaXRvcnkzOTk0MDAyODE=",
    hasIssues: true,
  },
  "nuvyntralabs/Twilio.Voice.iOS.XamarinBinding": {
    repo: "nuvyntralabs/Twilio.Voice.iOS.XamarinBinding",
    repoId: "MDEwOlJlcG9zaXRvcnkzOTk0MDA0NjY=",
    hasIssues: true,
  },
  "nuvyntralabs/VOBIZ-VOIP-Call": {
    repo: "nuvyntralabs/VOBIZ-VOIP-Call",
    repoId: "R_kgDOUAQ38w",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOUAQ3884DEcrR",
    },
  },
  "nuvyntralabs/Vehicle-Inspection-Kotlin": {
    repo: "nuvyntralabs/Vehicle-Inspection-Kotlin",
    repoId: "R_kgDOTMy9uQ",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOTMy9uc4DEcrL",
    },
  },
  "nuvyntralabs/callkitsample": {
    repo: "nuvyntralabs/callkitsample",
    repoId: "MDEwOlJlcG9zaXRvcnk0MDIxNjM5ODk=",
    hasIssues: false,
  },
  "nuvyntralabs/solar-sales-automation": {
    repo: "nuvyntralabs/solar-sales-automation",
    repoId: "R_kgDOT9RkNg",
    hasIssues: true,
    giscus: {
      category: "Announcements",
      categoryId: "DIC_kwDOT9RkNs4DEcrX",
    },
  },
};
