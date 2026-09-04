import type { DocSection } from "@/content/mvvmexpress";
import {
  httpForgeComparisonDescription,
  httpForgeComparisonHref,
  httpForgeComparisonSections,
  httpForgeComparisonTitle,
  httpForgeDocsHref,
  httpForgeIntegrationDescription,
  httpForgeIntegrationHref,
  httpForgeIntegrationSections,
  httpForgeIntegrationTitle,
  httpForgeSlug,
  httpForgeTechnicalDescription,
  httpForgeTechnicalSections,
  httpForgeTechnicalTitle,
} from "@/content/http-forge";
import {
  leakAnalyserComparisonDescription,
  leakAnalyserComparisonHref,
  leakAnalyserComparisonSections,
  leakAnalyserComparisonTitle,
  leakAnalyserDocsHref,
  leakAnalyserIntegrationDescription,
  leakAnalyserIntegrationHref,
  leakAnalyserIntegrationSections,
  leakAnalyserIntegrationTitle,
  leakAnalyserSlug,
  leakAnalyserTechnicalDescription,
  leakAnalyserTechnicalSections,
  leakAnalyserTechnicalTitle,
} from "@/content/leak-analyser";
import { comparisonHref, comparisonSections } from "@/content/mvvmexpress-comparison";
import { docsBase, getGuideTopic, integrationHref } from "@/content/mvvmexpress-guide";
import { integrationSections, mvvmExpressSlug } from "@/content/mvvmexpress";

export type PackageGuideKind = "docs" | "integration" | "comparison";

export interface PackageGuidePage {
  title: string;
  description: string;
  sections: DocSection[];
  currentHref: string;
}

export function getPackageGuidePage(slug: string, kind: PackageGuideKind): PackageGuidePage | undefined {
  if (slug === mvvmExpressSlug) {
    if (kind === "docs") {
      const topic = getGuideTopic("introduction");
      if (!topic) return undefined;
      return {
        title: topic.title,
        description: topic.description,
        sections: topic.sections,
        currentHref: `${docsBase}/`,
      };
    }
    if (kind === "integration") {
      return {
        title: `Get started with MVVMExpress`,
        description:
          "From NuGet install to a testable ViewModel: 1.0.0 SemVer lock, first screen, UseNavigationPage vs UseShell, Playground clone, FakeNavigator / LeakProbe, forms, generators, and the in-repo sample map.",
        sections: integrationSections,
        currentHref: integrationHref,
      };
    }
    return {
      title: "MVVMExpress vs CommunityToolkit, Prism, and ReactiveUI",
      description:
        "An architectural comparison of shipped surfaces plus a syntax map from CommunityToolkit and Prism names. Scores are not BenchmarkDotNet or device RSS. Choose the stack that matches the app — CommunityToolkit for a small ViewModel layer, Prism for URI navigation without Shell, ReactiveUI for Rx-first apps, or MVVMExpress for one application shell.",
      sections: comparisonSections,
      currentHref: comparisonHref,
    };
  }

  if (slug === httpForgeSlug) {
    if (kind === "docs") {
      return {
        title: httpForgeTechnicalTitle,
        description: httpForgeTechnicalDescription,
        sections: httpForgeTechnicalSections,
        currentHref: httpForgeDocsHref,
      };
    }
    if (kind === "integration") {
      return {
        title: httpForgeIntegrationTitle,
        description: httpForgeIntegrationDescription,
        sections: httpForgeIntegrationSections,
        currentHref: httpForgeIntegrationHref,
      };
    }
    return {
      title: httpForgeComparisonTitle,
      description: httpForgeComparisonDescription,
      sections: httpForgeComparisonSections,
      currentHref: httpForgeComparisonHref,
    };
  }

  if (slug === leakAnalyserSlug) {
    if (kind === "docs") {
      return {
        title: leakAnalyserTechnicalTitle,
        description: leakAnalyserTechnicalDescription,
        sections: leakAnalyserTechnicalSections,
        currentHref: leakAnalyserDocsHref,
      };
    }
    if (kind === "integration") {
      return {
        title: leakAnalyserIntegrationTitle,
        description: leakAnalyserIntegrationDescription,
        sections: leakAnalyserIntegrationSections,
        currentHref: leakAnalyserIntegrationHref,
      };
    }
    return {
      title: leakAnalyserComparisonTitle,
      description: leakAnalyserComparisonDescription,
      sections: leakAnalyserComparisonSections,
      currentHref: leakAnalyserComparisonHref,
    };
  }

  return undefined;
}
