import { readFileSync } from "node:fs";
import { join } from "node:path";
import { slugifyHeading } from "@/lib/markdown-docs";

const sourcePath = join(process.cwd(), "content/uikit/source/UIKitLib.md");

export type UiKitKind = "foundation" | "view" | "helper" | "recipe";

export interface UiKitAttribute {
  name: string;
  type: string;
  defaultValue: string;
  custom: boolean;
  note: string;
  inheritedFrom?: string;
}

export interface UiKitComponent {
  slug: string;
  name: string;
  layer: string;
  kind: UiKitKind;
  summary: string;
  officialSample: string;
  sampleLanguage: "xml" | "csharp";
  attributes: UiKitAttribute[];
  inherits?: string;
  related: string[];
}

export interface UiKitEnum {
  name: string;
  values: string[];
}

const inheritFrom: Record<string, string> = {
  NVIconButton: "NVButton",
  NVSpeechToTextButton: "NVIconButton",
  NVMaskedEntry: "NVTextField",
  NVNumericEntry: "NVTextField",
  NVNumericUpDown: "NVNumericEntry",
  NVAutoComplete: "NVTextField",
  NVSearchBar: "NVTextField",
  NVPicker: "NVComboBox",
  NVTemplatedPicker: "NVComboBox",
  NVMenu: "NVDropDownButton",
  NVPopup: "NVOverlay",
  NVBottomSheet: "NVOverlay",
  NVDialog: "NVOverlay",
  NVActionSheet: "NVOverlay",
  NVLightbox: "NVOverlay",
  NVCircularProgressBar: "NVProgressBar",
  NVLinearGauge: "NVProgressBar",
  NVAlert: "NVBanner",
  NVOfflineBanner: "NVBanner",
  NVRetryView: "NVEmptyView",
  NVAccordion: "NVExpander",
  NVBottomNavigation: "NVTabView",
  NVSideDrawer: "NVNavigationDrawer",
  NVNavigationView: "NVNavigationDrawer",
  NVAppBar: "NVToolbar",
  NVListView: "NVCollectionView",
  NVCardsView: "NVCollectionView",
  NVTreeDataGrid: "NVDataGrid",
  NVOrgChart: "NVTreeView",
  NVSparkline: "NVChart",
  NVRadialGauge: "NVGauge",
  NVDigitalGauge: "NVGauge",
  NVScheduler: "NVCalendar",
  NVInputField: "NVTextField",
  NVEmailField: "NVInputField",
  NVPhoneField: "NVTextField",
  NVPasswordField: "NVTextField",
  NVCouponField: "NVTextField",
  NVQuantityStepper: "NVNumericUpDown",
  NVLockPad: "NVPinPad",
  NVCountryPicker: "NVComboBox",
  NVLanguagePicker: "NVComboBox",
  NVThemePicker: "NVSegmentedControl",
  NVRichTextEditor: "NVEditor",
  NVPromptInput: "NVTextField",
  NVDocxViewer: "NVPdfViewer",
  NVSlideView: "NVCarousel",
  NVParallaxView: "NVCarousel",
  NVMaps: "NVMap",
  NVHeatMap: "NVTreeMap",
  NVBodyText: "NVHeading",
  NVCaptionText: "NVHeading",
};

const frameworkAttributes: UiKitAttribute[] = [
  {
    name: "IsVisible",
    type: "bool",
    defaultValue: "`true`",
    custom: false,
    note: "MAUI `VisualElement`. Hide the control without removing it from the tree.",
  },
  {
    name: "IsEnabled",
    type: "bool",
    defaultValue: "`true`",
    custom: false,
    note: "MAUI `VisualElement`. When false, the control ignores input and uses the Disabled visual state.",
  },
  {
    name: "Margin",
    type: "Thickness",
    defaultValue: "`0`",
    custom: false,
    note: "MAUI `View`. Outer gap around the control. Use `NVTokens.Space*` for Lumina rhythm.",
  },
  {
    name: "HorizontalOptions",
    type: "LayoutOptions",
    defaultValue: "`Fill`",
    custom: false,
    note: "MAUI `View`. Horizontal alignment in the parent (`Start`, `Center`, `End`, `Fill`).",
  },
  {
    name: "VerticalOptions",
    type: "LayoutOptions",
    defaultValue: "`Fill`",
    custom: false,
    note: "MAUI `View`. Vertical alignment in the parent.",
  },
  {
    name: "BindingContext",
    type: "object?",
    defaultValue: "inherited",
    custom: false,
    note: "MAUI `BindableObject`. Source for `{Binding …}` paths on this subtree.",
  },
];

const attributeHelp: Record<string, string> = {
  Text: "Visible copy on the control — label, button caption, banner, or body.",
  Title: "Primary heading shown in the chrome (card, toolbar, dialog, ticket, empty state).",
  Subtitle: "Secondary line under Title.",
  Body: "Longer supporting copy, or the main content slot on a scaffold.",
  Label: "Floating / leading caption for a field or stat. FieldChrome labels sit above the value.",
  Helper: "Quiet hint under a field. Hidden when Error is set.",
  Error: "Validation message. Setting a non-empty value turns HasError on.",
  HasError: "True when Error is non-empty. Drives the Error visual state on FieldChrome.",
  Placeholder: "Ghost text shown while Text is empty.",
  IsPassword: "Masks the field (password / secret entry).",
  Variant: "Lumina button style: Filled, Tonal, Outline, Ghost, or Danger.",
  Kind: "Glyph or chip role from the matching NV* enum.",
  Tone: "Banner severity: Info, Success, Warning, or Danger.",
  Role: "Typography scale: Display, Title, Body, or Caption.",
  Reason: "Empty-state illustration preset from NVStatusReason.",
  LayoutMode: "Collection presentation: List, Tile, or Card.",
  Elevation: "Shadow step 0–5 on NVSurface.",
  StatusOn: "Online / presence pip on the avatar.",
  Spin: "Rotate the icon (in-progress).",
  Dot: "Render the badge as a pip instead of a count.",
  Command: "ICommand run on activate (tap). Marshals to the UI thread through MAUI.",
  CommandParameter: "Object passed to Command.",
  IsChecked: "Selected / checked. On NVCheckBox this is bool? so null is indeterminate.",
  IsOn: "On / off. Lumina name for MAUI IsToggled.",
  IsSelected: "Selected state for chips and similar choice chrome.",
  IsExpanded: "Open / closed for expanders.",
  IsOpen: "Shows the overlay, sheet, or dialog.",
  DismissOnScrim: "Tap outside the panel closes it when true.",
  Placement: "Where the overlay panel sits: Center, Bottom, Top, Start, or End.",
  PanelContent: "View drawn inside the overlay panel.",
  Content: "Inner child. Hides ContentView.Content on NVSurface.",
  Target: "Child the effect wraps (press / highlight).",
  Viewport: "Child the interactive viewer pans and zooms.",
  Child: "Inner view (safe-area host).",
  Size: "Token-sized gap. Prefer NVTokens.Space*.",
  GroupName: "Radio exclusive-set name. Radios that share a name stay mutually exclusive.",
  Value: "Primary value — number, string, object, or gauge reading depending on the control.",
  Items: "String or typed list the control presents.",
  SelectedItem: "Currently chosen string from Items.",
  SelectedIndex: "Zero-based selected segment, tab, or picker row.",
  Suggestions: "Auto-complete candidate strings. Filter in code with Filter() / FilterSuggestions().",
  Mask: "Input pattern. 0 means a digit on NVMaskedEntry / NVPhoneField.",
  Minimum: "Lower bound for numeric entry.",
  Maximum: "Upper bound for numeric entry.",
  Length: "Digit count for OTP.",
  Code: "Entered PIN, OTP, or ticket code.",
  Date: "Selected calendar date.",
  Time: "Selected time of day.",
  Duration: "Selected TimeSpan on NVTimeSpanPicker.",
  Color: "Picked Color. Default is Lumina teal.",
  Start: "Range start (slider value or date).",
  End: "Range end (slider value or date).",
  HasStroke: "True after the user marks the signature pad. Export() returns a token when true.",
  IsRefreshing: "Pull-to-refresh busy flag.",
  Message: "Dialog body copy.",
  Steps: "Named steps for a wizard or step progress.",
  Index: "Zero-based current step, page, or carousel position.",
  Count: "How many dots, selections, or items the chrome shows.",
  ShowFab: "Show the floating action button on the scaffold.",
  Tabs: "Tab titles.",
  TotalCount: "Total rows the pager is paging.",
  PageSize: "Rows per page.",
  PageIndex: "Zero-based page.",
  PageCount: "Computed page count from TotalCount / PageSize.",
  Columns: "Grid or kanban column definitions.",
  Rows: "Grid row dictionaries keyed by column Binding / Key.",
  Roots: "Tree roots.",
  Fields: "Data-form field definitions.",
  Series: "Chart series.",
  Format: "Barcode symbology. Generate only — this kit does not scan.",
  Place: "Map caption / place name. Not a paid tile engine.",
  Month: "Visible calendar month.",
  SelectedDate: "Tapped day on the calendar.",
  Appointments: "Scheduler items (Title, Start, End, Recurrence).",
  Caption: "Image or editor caption.",
  Markdown: "Markdown source for the viewer.",
  Url: "http(s) address for NVWebView.",
  Prompt: "AI assist prompt string.",
  Password: "Secret scored by NVPasswordStrength.",
  Score: "Computed 0–4 strength. Read-only.",
  Amount: "Currency amount.",
  Seconds: "Countdown remaining seconds.",
  Total: "Cart bar total.",
  Name: "Display name on a profile header.",
  IsMine: "Align the chat bubble to the current user.",
  Messages: "Chat transcript (Author, Text, IsMine, At).",
  Cells: "Spreadsheet cells (Row, Column, Text / Value).",
  Nodes: "Tree-map nodes (Title, Value / Weight).",
  Seats: "Seat cells (Label, Taken).",
  Groups: "Grouped-list headers. Custom vs Items.",
  SelectionMode: "List selection: None, Single, or Multiple (NVSelectionKind).",
  SelectedItems: "Currently selected NVListItem rows when SelectionMode is not None.",
  Grouped: "When true, items are first-letter grouped as NVListGroup rows.",
  AllowSwipe: "Shows swipe actions on hosted CollectionView rows.",
  Filter: "Case-insensitive cell match that drives VisibleRows.",
  SortKey: "Column Binding / Key the grid is sorted by. Header tap cycles none → asc → desc.",
  SortDirection: "None, Ascending, or Descending (NVSortDirection).",
  FrozenColumnCount: "How many leading columns stay pinned, plus per-column Frozen.",
  VisibleRows: "Computed filtered / sorted / paged row set.",
  SelectedDates: "Tapped days when AllowMultiple is true.",
  AllowMultiple: "Calendar can keep more than one SelectedDate.",
  AgendaDate: "Day the scheduler agenda is filtered to.",
  RecurrenceCap: "Max expanded recurrence instances (default 64).",
  Query: "Filter string — command palette, emoji picker, or PDF find.",
  Commands: "Command-palette actions (NVCommandItem Title + Command).",
  Recents: "Palette rows shown when Query is empty.",
  IsAccepted: "Consent banner accepted flag. Accept() sets this true.",
  IsBlocking: "Paywall Dismiss is a no-op when true.",
  VersionTitle: "What's-new heading (default What's new).",
  Files: "Dropped or picked file chips (Name required).",
  Values: "Heat-calendar day values (Date + Value).",
  Actions: "Speed-dial actions (label + command).",
  Facts: "Pivot-grid facts.",
  Json: "JSON source for NVJsonTree.",
  Left: "Diff left / original text.",
  Right: "Diff right / changed text.",
  Mode: "NVDiffMode: Unified or SideBySide.",
  IsMuted: "In-call mute state.",
  Elapsed: "In-call elapsed label.",
  Keypad: "In-call keypad visibility.",
  Local: "Local side of a sync conflict.",
  Remote: "Remote side of a sync conflict.",
  FileName: "Upload tile file name.",
  Bytes: "Upload tile size.",
  Status: "NFC prompt status copy.",
  Rating: "Review-prompt star value.",
  Attachments: "Chat file chips. Attach() appends one.",
  IsStreaming: "Chat is receiving an AppendStream token.",
  Pages: "Document page count on the PDF / Docx viewer.",
  Zoom: "Viewer zoom factor.",
  MatchCount: "How many Query hits the document viewer found.",
  RotationDegrees: "Image-editor rotation.",
  CropRect: "Image-editor crop rectangle.",
  Annotations: "Image-editor annotation list.",
  Source: "Image source.",
  ImageSource: "Optional photo; Initials show when this is null.",
  Initials: "Fallback letters on the avatar.",
  IsVertical: "Draw the divider as a vertical rule.",
  IsEnabled: "When false, input is ignored.",
  IsVisible: "When false, the control is hidden.",
};

let cached: { enums: UiKitEnum[]; components: UiKitComponent[] } | null = null;

export function loadUiKitCatalog() {
  if (cached) return cached;
  const markdown = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  const enums = parseEnums(markdown);
  const components = parseComponents(markdown);
  cached = { enums, components };
  return cached;
}

export function getUiKitComponent(slug: string): UiKitComponent | undefined {
  return loadUiKitCatalog().components.find((item) => item.slug === slug);
}

export function uiKitComponentSlugs(): string[] {
  return loadUiKitCatalog().components.map((item) => item.slug);
}

export function inheritedMauiAttributes(): UiKitAttribute[] {
  return frameworkAttributes;
}

export function explainAttribute(attribute: UiKitAttribute, componentName: string): string {
  const cleaned = stripCustom(attribute.note);
  if (cleaned) return cleaned;
  const named = attributeHelp[attribute.name];
  if (named) {
    if (attribute.inheritedFrom) {
      return `${named} Inherited from ${attribute.inheritedFrom}.`;
    }
    return named;
  }
  if (attribute.inheritedFrom) {
    return `${attribute.name} on ${componentName}, inherited from ${attribute.inheritedFrom}.`;
  }
  if (attribute.custom) {
    return `Lumina API on ${componentName}. Type is ${attribute.type}.`;
  }
  return `Standard ${attribute.type} member on ${componentName}. Matches familiar MAUI / forms usage.`;
}

export function fullXaml(component: UiKitComponent, xmlns = "http://nuvyntralabs.com/uikit"): string {
  if (component.kind === "helper" || component.kind === "foundation") {
    return component.officialSample;
  }

  const kit = component.attributes.filter((item) => !isMethod(item) && !isContentChild(item));
  const child = component.attributes.find(isContentChild);
  const lines = [`xmlns:nv="${xmlns}"`, "", `<nv:${component.name}`];

  for (const attribute of kit) {
    lines.push(`    ${attribute.name}="${xamlLiteral(attribute)}"`);
  }
  for (const attribute of frameworkAttributes) {
    lines.push(`    ${attribute.name}="${xamlLiteral(attribute)}"`);
  }

  if (child || component.officialSample.includes(`</nv:${component.name}>`)) {
    lines[lines.length - 1] += ">";
    if (component.name === "NVRadioGroup") {
      lines.push('    <nv:NVRadioButton Text="Monthly" />');
      lines.push('    <nv:NVRadioButton Text="Yearly" />');
    } else if (child?.name === "Content") {
      lines.push('    <Label Text="Child" />');
    } else if (child) {
      lines.push(`    <!-- set ${child.name} in code or as a child view -->`);
    }
    lines.push(`</nv:${component.name}>`);
  } else {
    lines[lines.length - 1] += " />";
  }

  return lines.join("\n");
}

function parseEnums(markdown: string): UiKitEnum[] {
  const block = markdown.split("## How to read a row")[0] ?? "";
  const rows = readTables(block)[0]?.rows ?? [];
  return rows.map((row) => ({
    name: unwrap(row[0]),
    values: (row[1] ?? "")
      .split(/[,`]+/)
      .map((item) => item.trim())
      .filter(Boolean),
  }));
}

function parseComponents(markdown: string): UiKitComponent[] {
  const byName = new Map<string, UiKitComponent>();
  const layers = splitLayers(markdown);

  for (const layer of layers) {
    if (layer.title.startsWith("How to read") || layer.title.startsWith("Custom property") || layer.title.startsWith("Out of scope")) {
      continue;
    }
    if (layer.title.startsWith("Foundation")) {
      for (const component of parseFoundation(layer.body)) {
        byName.set(component.name, component);
      }
      continue;
    }
    if (layer.title.startsWith("Page recipes")) {
      for (const component of parseRecipes(layer.body)) {
        byName.set(component.name, component);
      }
      continue;
    }
    if (layer.title.startsWith("Next")) {
      for (const component of parseNextLayer(layer.body)) {
        byName.set(component.name, component);
      }
      continue;
    }

    for (const heading of splitHeadings(layer.body)) {
      const names = uniqueNames([...nvNames(heading.title), ...prefixedOwners(heading.body)]);
      if (names.length === 0) continue;
      const summary = firstParagraph(heading.body);
      const sample = firstFence(heading.body);
      const tables = readTables(heading.body);
      const attributesByType = collectAttributes(names, tables, heading.body);

      for (const name of names) {
        const kind: UiKitKind = /static helper|not a view|not a control/i.test(`${heading.title}\n${heading.body}`)
          ? "helper"
          : "view";
        byName.set(name, {
          slug: slugifyHeading(name),
          name,
          layer: layerLabel(layer.title),
          kind,
          summary: summary || `${name} in the ${layerLabel(layer.title)} layer.`,
          officialSample: sample.code,
          sampleLanguage: sample.language === "csharp" ? "csharp" : "xml",
          attributes: attributesByType.get(name) ?? [],
          inherits: inheritFrom[name],
          related: names.filter((item) => item !== name),
        });
      }
    }
  }

  applyInheritance(byName);
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function parseFoundation(body: string): UiKitComponent[] {
  const table = readTables(body)[0];
  if (!table) return [];
  const sample = firstFence(body);
  return table.rows.map((row) => {
    const name = unwrap(row[0]);
    const members = splitMemberList(row[2] ?? "");
    return {
      slug: slugifyHeading(name),
      name,
      layer: "Foundation",
      kind: "foundation" as const,
      summary: unwrap(row[1]) || `${name} is a Lumina foundation helper — not a XAML view.`,
      officialSample: sample.code || `${name} usage lives in C#. Register with UseNuvyntraUIKit().`,
      sampleLanguage: "csharp" as const,
      attributes: members.map((member) => ({
        name: member.name,
        type: member.method ? "method" : "member",
        defaultValue: "",
        custom: member.custom,
        note:
          name === "NVChrome"
            ? "Shared Lumina paint recipe. Controls call this instead of inventing fills."
            : member.note,
      })),
      related: [],
    };
  });
}

function parseNextLayer(body: string): UiKitComponent[] {
  const [chrome12 = "", chrome13 = ""] = body.split(/^### 1\.3 types/m);
  const sample = firstFence(body);
  return [
    ...parseTypedPropertyTables(chrome12, "Next · 1.2", sample.code),
    ...parseTypedPropertyTables(chrome13, "Next · 1.3", sample.code),
  ];
}

function parseTypedPropertyTables(body: string, layer: string, sample: string): UiKitComponent[] {
  const byName = new Map<string, UiKitComponent>();
  let current = "";

  for (const table of readTables(body)) {
    const headers = table.headers.map((item) => item.toLowerCase());
    if (headers[0] !== "type" || !headers.includes("property")) continue;
    const defaultIndex = headers[3] === "default" ? 3 : -1;
    const noteIndex = defaultIndex >= 0 ? 4 : 3;

    for (const row of table.rows) {
      const owners = nvNames(row[0] ?? "");
      if (owners[0]) current = owners[0];
      if (!current) continue;

      if (!byName.has(current)) {
        byName.set(current, {
          slug: slugifyHeading(current),
          name: current,
          layer,
          kind: "view",
          summary: nextSummary(current),
          officialSample: nextSample(current, sample),
          sampleLanguage: "xml",
          attributes: [],
          inherits: inheritFrom[current],
          related: [],
        });
      }

      const props = parseNameList(row[1] ?? "");
      const types = splitSlash(row[2] ?? "");
      const defaults = defaultIndex >= 0 ? splitSlash(row[defaultIndex] ?? "") : [];
      const note = [row[noteIndex], defaultIndex < 0 ? row[3] : ""].filter(Boolean).join(" ");

      props.forEach((prop, index) => {
        const attribute = toAttribute(
          prop.name,
          typeForIndex(types, index, props.length),
          defaults[index] ?? defaults[0] ?? "",
          note,
          prop.custom,
        );
        const list = byName.get(current)!.attributes;
        if (!list.some((item) => item.name === attribute.name)) list.push(attribute);
      });
    }
  }

  return [...byName.values()];
}

function nextSummary(name: string): string {
  const summaries: Record<string, string> = {
    NVCommandPalette: "Command palette. Empty Query shows Recents; filter is case-insensitive.",
    NVCoachMark: "Coach-mark steps with an Index into Steps.",
    NVContextMenu: "Context menu of NVMenuAction items plus OpenCommand.",
    NVFileDrop: "File drop / pick chrome. Ignores chips with an empty Name.",
    NVPaywall: "Plan wall. Dismiss is a no-op when IsBlocking.",
    NVWhatsNew: "What's-new list with a VersionTitle heading.",
    NVConsentBanner: "Privacy / cookie banner. Accept() sets IsAccepted.",
    NVHeatCalendar: "Month heatmap. Cells equal days in Month; missing Values draw empty.",
    NVSpeedDial: "FAB speed dial of NVSpeedDialAction items.",
    NVSubscriptionCard: "Plan card with name, price, features, and CTA.",
    NVEmojiPicker: "Emoji picker with Query, Glyphs, and Selected.",
    NVPivotGrid: "Pivot surface over NVPivotFact rows.",
    NVPropertyGrid: "Property inspector over NVPropertyItem rows.",
    NVJsonTree: "Tree view of a JSON string.",
    NVDiffView: "Unified or side-by-side text diff.",
    NVCodeEditor: "Code editor chrome. Host supplies language services.",
    NVCallBar: "In-call bar with mute and end commands. Host supplies VoIP.",
    NVInCallView: "In-call surface with name, elapsed, and optional keypad.",
    NVSyncConflictCard: "Local vs remote conflict card. Host supplies sync.",
    NVUploadTile: "Upload progress tile with retry.",
    NVDeviceSheet: "Nearby / paired device sheet. Host supplies transport.",
    NVPrintPreview: "Print / share preview. Host supplies Printing.",
    NVNfcPrompt: "NFC hold-near prompt. Host supplies the tag session.",
    NVReviewPrompt: "Store-review prompt chrome. Host supplies AppReview.",
  };
  return summaries[name] ?? `${name} is Next-layer Lumina chrome. Host plugins stay out of this package.`;
}

function nextSample(name: string, fence: string): string {
  const match = fence.match(new RegExp(`<nv:${name}\\b[\\s\\S]*?(?:/>|></nv:${name}>)`));
  return match?.[0] ?? `<nv:${name} />`;
}

function splitSlash(cell: string): string[] {
  return unwrap(cell)
    .split(" / ")
    .map((item) => item.trim())
    .filter(Boolean);
}

function typeForIndex(types: string[], index: number, count: number): string {
  if (!types.length) return "";
  if (types.length === count) return types[index] ?? "";
  if (count === 1) return types.join(" / ");
  if (index === count - 1) return types[types.length - 1] ?? types[0] ?? "";
  return types[0] ?? "";
}

function parseRecipes(body: string): UiKitComponent[] {
  const table = readTables(body).find((item) => item.headers[0]?.toLowerCase().includes("group"));
  if (!table) return [];
  const components: UiKitComponent[] = [];
  for (const row of table.rows) {
    const group = unwrap(row[0]);
    for (const name of nvNames(row[1] ?? "")) {
      components.push({
        slug: slugifyHeading(name),
        name,
        layer: `Pages · ${group}`,
        kind: "recipe",
        summary: `${name} is a ${group.toLowerCase()} page recipe. Recipes compose the NV* controls above. They do not add new bindable names — they set titles and seed demo children.`,
        officialSample: `<nv:${name} />`,
        sampleLanguage: "xml",
        attributes: [],
        related: [],
      });
    }
  }
  return components;
}

function collectAttributes(names: string[], tables: ParsedTable[], body: string): Map<string, UiKitAttribute[]> {
  const map = new Map<string, UiKitAttribute[]>(names.map((name) => [name, []]));
  const push = (name: string, attribute: UiKitAttribute) => {
    const list = map.get(name);
    if (!list || list.some((item) => item.name === attribute.name)) return;
    list.push(attribute);
  };

  for (const table of tables) {
    const headers = table.headers.map((item) => item.toLowerCase());
    const isProperty = headers.includes("property");
    const isControl = headers[0] === "control" || headers[0] === "extra";
    for (const row of table.rows) {
      if (isControl) {
        const owners = nvNames(row[0] ?? "");
        const props = parseNameList(row[1] ?? "");
        const types = splitTypes(row[2] ?? "");
        const note = [row[2], row[3]].filter(Boolean).join(" ");
        props.forEach((prop, index) => {
          const attribute = toAttribute(prop.name, types[index] ?? types[0] ?? "", "", note, prop.custom);
          const targets = owners.length ? owners : names;
          for (const target of targets) push(target, attribute);
        });
        continue;
      }
      if (isProperty) {
        const props = parseNameList(row[0] ?? "");
        if (props.length === 1 && props[0].name.startsWith("(")) continue;
        const types = splitSlash(row[1] ?? "");
        const defaults = splitSlash(row[2] ?? "");
        const note = [row[2], row[3]].filter(Boolean).join(" ");
        props.forEach((prop, index) => {
          const owner = ownerFromPrefixed(prop.name);
          const attribute = toAttribute(
            owner?.property ?? prop.name,
            typeForIndex(types, index, props.length),
            defaults[index] ?? defaults[0] ?? "",
            note,
            prop.custom,
          );
          if (owner) {
            push(owner.type, attribute);
          } else {
            for (const name of names) push(name, attribute);
          }
        });
      }
    }
  }

  if (/NVPhoneField\.Mask|NVPhoneField/i.test(body) && names.includes("NVPhoneField")) {
    push("NVPhoneField", toAttribute("Mask", "string", "", "Phone mask on top of NVTextField.", true));
  }

  return map;
}

function applyInheritance(byName: Map<string, UiKitComponent>) {
  const resolve = (name: string, seen = new Set<string>()): UiKitAttribute[] => {
    const component = byName.get(name);
    if (!component || seen.has(name)) return component?.attributes ?? [];
    seen.add(name);
    const parent = component.inherits;
    if (!parent) return component.attributes;
    const inherited = resolve(parent, seen).map((item) => ({
      ...item,
      inheritedFrom: item.inheritedFrom ?? parent,
    }));
    const ownNames = new Set(component.attributes.map((item) => item.name));
    return [...component.attributes, ...inherited.filter((item) => !ownNames.has(item.name))];
  };

  for (const component of byName.values()) {
    component.attributes = resolve(component.name);
    if (component.inherits && byName.has(component.inherits) && !component.related.includes(component.inherits)) {
      component.related = [component.inherits, ...component.related];
    }
  }
}

function splitLayers(markdown: string): { title: string; body: string }[] {
  const parts = markdown.split(/^## /m).slice(1);
  return parts.map((part) => {
    const newline = part.indexOf("\n");
    return {
      title: part.slice(0, newline).trim(),
      body: part.slice(newline + 1),
    };
  });
}

function splitHeadings(body: string): { title: string; body: string }[] {
  const parts = body.split(/^### /m).slice(1);
  return parts.map((part) => {
    const newline = part.indexOf("\n");
    return {
      title: part.slice(0, newline).trim(),
      body: part.slice(newline + 1),
    };
  });
}

function readTables(markdown: string): ParsedTable[] {
  const lines = markdown.split("\n");
  const tables: ParsedTable[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!isTableStart(lines, i)) continue;
    const headers = splitRow(lines[i]);
    i += 2;
    const rows: string[][] = [];
    while (i < lines.length && lines[i].includes("|") && !/^---+$/.test(lines[i].trim())) {
      rows.push(splitRow(lines[i]));
      i += 1;
    }
    tables.push({ headers, rows });
  }
  return tables;
}

interface ParsedTable {
  headers: string[];
  rows: string[][];
}

function isTableStart(lines: string[], index: number): boolean {
  return Boolean(lines[index]?.includes("|") && lines[index + 1] && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1]));
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function firstParagraph(body: string): string {
  const lines: string[] = [];
  for (const line of body.split("\n")) {
    if (line.startsWith("```") || line.startsWith("|") || line.startsWith("###") || line.startsWith("##")) break;
    if (line.trim() === "" || /^---+$/.test(line.trim())) {
      if (lines.length) break;
      continue;
    }
    lines.push(line.trim());
  }
  return lines.join(" ").replace(/\s+/g, " ").trim();
}

function firstFence(body: string): { language: string; code: string } {
  const match = body.match(/```(\w+)?\n([\s\S]*?)```/);
  return { language: match?.[1] ?? "xml", code: (match?.[2] ?? "").trim() };
}

function nvNames(text: string): string[] {
  return uniqueNames([...text.matchAll(/NV[A-Za-z0-9]+/g)].map((match) => match[0]));
}

function uniqueNames(names: string[]): string[] {
  return names.filter((item, index, all) => all.indexOf(item) === index);
}

function prefixedOwners(body: string): string[] {
  return uniqueNames(
    readTables(body).flatMap((table) =>
      table.rows.flatMap((row) => {
        const owner = ownerFromPrefixed(unwrap(row[0] ?? "").split(/\s+/)[0] ?? "");
        return owner ? [owner.type] : [];
      }),
    ),
  );
}

function unwrap(value: string): string {
  return value.replace(/`/g, "").replace(/\*\*/g, "").trim();
}

function stripCustom(note: string): string {
  return note
    .replace(/\*\*custom\*\*/gi, "")
    .replace(/\bcustom\b/gi, "")
    .replace(/^[\s—–:-]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isCustom(text: string): boolean {
  return /\*\*custom\*\*|custom/i.test(text);
}

function parseNameList(cell: string): { name: string; custom: boolean }[] {
  const chunks = cell
    .split(/,|\/|(?:\s+and\s+)/)
    .map((item) => item.trim())
    .filter((item) => item && !item.startsWith("*("));
  const result: { name: string; custom: boolean }[] = [];
  for (const chunk of chunks) {
    const names = nvNames(chunk).length && chunk.includes(".") ? [unwrap(chunk).split(/\s+/)[0]] : unwrap(chunk).split(/\s+/);
    const name = unwrap(chunk)
      .replace(/\s+\*\*custom\*\*.*$/i, "")
      .replace(/\s+custom.*$/i, "")
      .replace(/\s+\(.*\)$/, "")
      .trim();
    if (!name || name.toLowerCase() === "property") continue;
    if (name.includes(" ")) {
      for (const token of name.split(/\s+/)) {
        const cleaned = token.replace(/[^A-Za-z0-9._]/g, "");
        if (cleaned) result.push({ name: cleaned, custom: isCustom(chunk) });
      }
      continue;
    }
    result.push({ name, custom: isCustom(chunk) || isCustom(cell) });
    void names;
  }
  return result.filter((item) => /^[A-Za-z][A-Za-z0-9.]*$/.test(item.name) || item.name.includes("."));
}

function splitTypes(cell: string): string[] {
  return unwrap(cell)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ownerFromPrefixed(name: string): { type: string; property: string } | undefined {
  const match = name.match(/^(NV[A-Za-z0-9]+)\.(.+)$/);
  if (!match) return undefined;
  return { type: match[1], property: match[2] };
}

function toAttribute(name: string, type: string, defaultValue: string, note: string, custom: boolean): UiKitAttribute {
  return {
    name,
    type: unwrap(type) || "object",
    defaultValue: unwrap(defaultValue),
    custom: custom || isCustom(note),
    note: stripCustom(note),
  };
}

function splitMemberList(cell: string): { name: string; method: boolean; custom: boolean; note: string }[] {
  return cell
    .split(",")
    .flatMap((item) => expandSlashMembers(item.trim()))
    .filter((item) => item.name);
}

function expandSlashMembers(item: string): { name: string; method: boolean; custom: boolean; note: string }[] {
  if (!item) return [];
  const custom = isCustom(item);
  const note = custom
    ? "Lumina-specific foundation member."
    : "Foundation member. Register fonts and theme with UseNuvyntraUIKit().";
  const parts = item.split("/").map((part) => part.trim()).filter(Boolean);
  const cleaned = parts.map((part) => ({
    name: unwrap(part)
      .replace(/\(\)$/, "")
      .replace(/\(key\)$/, "(key)")
      .replace(/\s+custom$/i, "")
      .trim(),
    method: part.includes("("),
  }));
  if (cleaned.length <= 1) {
    return cleaned.map((part) => ({ ...part, custom, note }));
  }

  const first = cleaned[0].name.replace(/\(.*\)$/, "");
  const prefixMatch = first.match(/^([A-Z][a-z]+(?:[A-Z][a-z]+)*)(?=[A-Z][a-z]+$)/);
  const prefix = prefixMatch?.[1] ?? "";

  return cleaned.map((part, index) => {
    let name = part.name;
    if (index > 0 && prefix && !name.startsWith(prefix)) {
      const suffix = name.replace(/\(.*\)$/, "");
      const methodSuffix = name.includes("(") ? name.slice(name.indexOf("(")) : "";
      name = `${prefix}${suffix}${methodSuffix}`;
    }
    return { name, method: part.method, custom, note };
  });
}

function layerLabel(title: string): string {
  return title.replace(/\s*\(.*\)$/, "").replace(/`NV\*View`/, "Pages").trim();
}

function isMethod(attribute: UiKitAttribute): boolean {
  return attribute.type === "method" || attribute.name.includes("(");
}

function isContentChild(attribute: UiKitAttribute): boolean {
  return ["Content", "PanelContent", "Target", "Viewport", "Child", "Body"].includes(attribute.name) && /View/.test(attribute.type);
}

function xamlLiteral(attribute: UiKitAttribute): string {
  const type = attribute.type;
  const raw = attribute.defaultValue.replace(/^`|`$/g, "");
  if (/ICommand/.test(type)) return "{Binding Submit}";
  if (/IList|IDictionary/.test(type)) return `{Binding ${attribute.name}}`;
  if (/ImageSource/.test(type)) return "{Binding Photo}";
  if (/DateTime/.test(type)) return "{Binding Date}";
  if (/TimeSpan/.test(type)) return "{Binding Time}";
  if (type === "Color") return raw && !/teal/i.test(raw) ? raw : "Teal";
  if (/bool/.test(type)) {
    if (/^true$/i.test(raw)) return "True";
    if (/^false$/i.test(raw)) return "False";
    return "False";
  }
  if (/int|double/.test(type)) {
    if (raw && /^-?\d/.test(raw)) return raw.replace(/[^\d.-]/g, "") || "0";
    if (attribute.name === "Elevation") return "1";
    if (attribute.name === "Value") return "0";
    return "0";
  }
  if (/LayoutOptions/.test(type)) return raw && raw !== "inherited" ? unwrap(raw) : "Fill";
  if (/Thickness/.test(type)) return "0";
  if (attribute.name === "BindingContext") return "{Binding}";
  if (/object/.test(type) && attribute.name === "CommandParameter") return "{x:Null}";
  if (/object/.test(type) && !raw) return "{x:Null}";
  if (raw && raw !== "inherited" && raw !== "empty" && raw !== "computed" && !/MinValue|MaxValue|today/.test(raw)) {
    const stripped = raw.replace(/^["']|["']$/g, "");
    if (stripped) return stripped;
  }
  if (attribute.name === "Text") return "Continue";
  if (attribute.name === "Label") return "Email";
  if (attribute.name === "Title") return "Lumina";
  if (attribute.name === "GroupName") return "Plan";
  if (attribute.name === "Url") return "https://nuvyntralabs.github.io/";
  if (attributeHelp[attribute.name] && type.includes("string")) return attribute.name;
  return raw.replace(/^"|"$/g, "") || attribute.name;
}
