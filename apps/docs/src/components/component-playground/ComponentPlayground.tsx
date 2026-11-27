import { useState, type ReactNode } from "react";
import {
  Button,
  Checkbox,
  DataTable,
  Dialog,
  Input,
  Radio,
  Select,
  Switch,
  Tabs,
  Tooltip,
  type ButtonSize,
  type ButtonVariant,
  type DataTableColumn,
} from "@hobiui/react";
import CodeBlock from "../code-block/CodeBlock";
import "./ComponentPlayground.css";

interface ComponentPlaygroundProps {
  title: string;
  description: string;
  controls: ReactNode;
  code: string;
  children: ReactNode;
}

function ComponentPlayground({ title, description, controls, code, children }: ComponentPlaygroundProps) {
  return (
    <section className="component-playground" aria-label={`${title} playground`}>
      <div className="component-playground__heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="component-playground__badge">Interactive</span>
      </div>
      <div className="component-playground__body">
        <div className="component-playground__preview" role="group" aria-label="Live preview">
          {children}
        </div>
        <fieldset className="component-playground__controls">
          <legend>Adjust props</legend>
          {controls}
        </fieldset>
      </div>
      <div className="component-playground__code">
        <p>Example code updates with the selected props.</p>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="component-playground__field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.currentTarget.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ToggleControl({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="component-playground__toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.currentTarget.checked)} />
      <span>{label}</span>
    </label>
  );
}

function TextControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="component-playground__field">
      <span>{label}</span>
      <input className="component-playground__text-control" value={value} onChange={(event) => onChange(event.currentTarget.value)} />
    </label>
  );
}

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [size, setSize] = useState<ButtonSize>("md");
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const code = `import { Button } from "@hobiui/react";\n\n<Button variant="${variant}" size="${size}"${active ? " active" : ""}${disabled ? " disabled" : ""}>\n  Continue\n</Button>`;

  return (
    <ComponentPlayground
      title="Button"
      description="Try the supported variants, sizes, and states."
      code={code}
      controls={(
        <>
          <SelectControl label="Variant" value={variant} options={["solid", "outline", "ghost"]} onChange={(value) => setVariant(value as ButtonVariant)} />
          <SelectControl label="Size" value={size} options={["sm", "md", "lg"]} onChange={(value) => setSize(value as ButtonSize)} />
          <ToggleControl label="Active" checked={active} onChange={setActive} />
          <ToggleControl label="Disabled" checked={disabled} onChange={setDisabled} />
        </>
      )}
    >
      <Button variant={variant} size={size} active={active} disabled={disabled}>Continue</Button>
    </ComponentPlayground>
  );
}

type InputType = "text" | "email" | "search";

export function InputPlayground() {
  const [type, setType] = useState<InputType>("email");
  const [required, setRequired] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const label = type === "email" ? "Email address" : type === "search" ? "Search" : "Your name";
  const autoComplete = type === "email" ? "email" : type === "search" ? "off" : "name";
  const code = `import { Input } from "@hobiui/react";\n\n<label htmlFor="playground-input">${label}</label>\n<Input\n  id="playground-input"\n  name="${type === "email" ? "email" : type === "search" ? "search" : "name"}"\n  type="${type}"\n  autoComplete="${autoComplete}"${required ? "\n  required" : ""}${disabled ? "\n  disabled" : ""}\n/>`;

  return (
    <ComponentPlayground
      title="Native input pattern"
      description="Change the input type and native required or disabled state."
      code={code}
      controls={(
        <>
          <SelectControl label="Type" value={type} options={["text", "email", "search"]} onChange={(value) => setType(value as InputType)} />
          <ToggleControl label="Required" checked={required} onChange={setRequired} />
          <ToggleControl label="Disabled" checked={disabled} onChange={setDisabled} />
        </>
      )}
    >
      <form className="component-playground__input-demo" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="playground-input">{label}</label>
        <Input
          id="playground-input"
          name={type === "email" ? "email" : type === "search" ? "search" : "name"}
          type={type}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          placeholder={type === "email" ? "name@example.com" : type === "search" ? "Search docs" : "Enter a name"}
          aria-describedby="playground-input-hint"
        />
        <span id="playground-input-hint">A visible label stays in place when a value is entered.</span>
      </form>
    </ComponentPlayground>
  );
}

export function DialogPlayground() {
  const [open, setOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const code = `import { useState } from "react";\nimport { Button, Dialog } from "@hobiui/react";\n\nfunction DialogExample() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open dialog</Button>\n      <Dialog\n        open={open}\n        onOpenChange={setOpen}\n        title="Review changes"${showDescription ? '\n        description="Check the details before continuing."' : ""}\n        footer={<Button variant="outline" onClick={() => setOpen(false)}>Close</Button>}\n      >\n        Changes to your settings will be applied after you save.\n      </Dialog>\n    </>\n  );\n}`;

  return (
    <ComponentPlayground
      title="Native dialog pattern"
      description="Try the controlled Hobi UI dialog and toggle its description."
      code={code}
      controls={<ToggleControl label="Show description" checked={showDescription} onChange={setShowDescription} />}
    >
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Review changes"
        description={showDescription ? "Check the details before continuing." : undefined}
        footer={<Button variant="outline" onClick={() => setOpen(false)}>Close</Button>}
      >
        Changes to your settings will be applied after you save.
      </Dialog>
    </ComponentPlayground>
  );
}

export function SelectPlayground() {
  const [value, setValue] = useState("docs");
  const [disabled, setDisabled] = useState(false);
  const code = `import { Select } from "@hobiui/react";\n\n<label htmlFor="team-select">Team</label>\n<Select id="team-select" defaultValue="${value}"${disabled ? " disabled" : ""}>\n  <option value="docs">Documentation</option>\n  <option value="design">Design systems</option>\n  <option value="platform">Platform</option>\n</Select>`;

  return (
    <ComponentPlayground
      title="Select"
      description="Choose an option using the native select control."
      code={code}
      controls={<ToggleControl label="Disabled" checked={disabled} onChange={setDisabled} />}
    >
      <div className="component-playground__input-demo">
        <label htmlFor="team-select">Team</label>
        <Select id="team-select" value={value} disabled={disabled} onChange={(event) => setValue(event.currentTarget.value)}>
          <option value="docs">Documentation</option>
          <option value="design">Design systems</option>
          <option value="platform">Platform</option>
        </Select>
      </div>
    </ComponentPlayground>
  );
}

export function CheckboxPlayground() {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const code = `import { Checkbox } from "@hobiui/react";\n\n<Checkbox\n  label="Send me product updates"\n  description="You can change this preference later."\n  defaultChecked={${checked}}${disabled ? "\n  disabled" : ""}\n/>`;

  return (
    <ComponentPlayground
      title="Checkbox"
      description="Use checkboxes for independent options that can be selected together."
      code={code}
      controls={<ToggleControl label="Disabled" checked={disabled} onChange={setDisabled} />}
    >
      <Checkbox
        label="Send me product updates"
        description="You can change this preference later."
        checked={checked}
        disabled={disabled}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </ComponentPlayground>
  );
}

export function RadioPlayground() {
  const [plan, setPlan] = useState("standard");
  const code = `import { Radio } from "@hobiui/react";\n\n<fieldset>\n  <legend>Plan</legend>\n  <Radio name="plan" value="standard" label="Standard" defaultChecked={${plan === "standard"}} />\n  <Radio name="plan" value="team" label="Team" defaultChecked={${plan === "team"}} />\n</fieldset>`;

  return (
    <ComponentPlayground
      title="Radio group"
      description="Use radios when one option must be selected from a group."
      code={code}
      controls={<span className="component-playground__control-note">Select an option in the preview.</span>}
    >
      <fieldset className="component-playground__radio-group">
        <legend>Plan</legend>
        <Radio name="plan" value="standard" label="Standard" description="For individual projects." checked={plan === "standard"} onChange={() => setPlan("standard")} />
        <Radio name="plan" value="team" label="Team" description="For shared workspaces." checked={plan === "team"} onChange={() => setPlan("team")} />
      </fieldset>
    </ComponentPlayground>
  );
}

export function SwitchPlayground() {
  const [enabled, setEnabled] = useState(true);
  const code = `import { Switch } from "@hobiui/react";\n\n<Switch\n  label="Email notifications"\n  description="Receive important account updates."\n  defaultChecked={${enabled}}\n/>`;

  return (
    <ComponentPlayground
      title="Switch"
      description="Use a switch for a setting that takes effect immediately."
      code={code}
      controls={<span className="component-playground__control-note">Toggle the switch in the preview.</span>}
    >
      <Switch
        label="Email notifications"
        description="Receive important account updates."
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
      />
    </ComponentPlayground>
  );
}

export function TabsPlayground() {
  const [orientation, setOrientation] = useState("horizontal");
  const code = `import { Tabs } from "@hobiui/react";\n\n<Tabs\n  aria-label="Workspace settings"\n  orientation="${orientation}"\n  items={[\n    { value: "profile", label: "Profile", content: "Manage your profile." },\n    { value: "security", label: "Security", content: "Review sign-in settings." },\n    { value: "billing", label: "Billing", content: "Manage your plan." },\n  ]}\n/>`;

  return (
    <ComponentPlayground
      title="Tabs"
      description="Use arrow keys to move between tabs; activation follows focus."
      code={code}
      controls={<SelectControl label="Orientation" value={orientation} options={["horizontal", "vertical"]} onChange={setOrientation} />}
    >
      <Tabs
        aria-label="Workspace settings"
        orientation={orientation as "horizontal" | "vertical"}
        items={[
          { value: "profile", label: "Profile", content: <p>Manage your profile details.</p> },
          { value: "security", label: "Security", content: <p>Review sign-in settings.</p> },
          { value: "billing", label: "Billing", content: <p>Manage your plan and invoices.</p> },
        ]}
      />
    </ComponentPlayground>
  );
}

export function TooltipPlayground() {
  const [content, setContent] = useState("Opens workspace settings");
  const code = `import { Button, Tooltip } from "@hobiui/react";\n\n<Tooltip content="${content.replaceAll('"', '\\"')}">\n  <Button variant="outline">Settings</Button>\n</Tooltip>`;

  return (
    <ComponentPlayground
      title="Tooltip"
      description="Hover or focus the button to reveal the supplementary description."
      code={code}
      controls={<TextControl label="Tooltip text" value={content} onChange={setContent} />}
    >
      <Tooltip content={content}>
        <Button variant="outline">Settings</Button>
      </Tooltip>
    </ComponentPlayground>
  );
}

interface DemoProject {
  name: string;
  owner: string;
  status: string;
}

const demoProjects: DemoProject[] = [
  { name: "Docs refresh", owner: "Maya", status: "In review" },
  { name: "Token package", owner: "Arjun", status: "In progress" },
  { name: "Icon catalog", owner: "Sam", status: "Ready" },
  { name: "Component guides", owner: "Riya", status: "In progress" },
];

const projectColumns: DataTableColumn<DemoProject>[] = [
  { id: "name", header: "Project", rowHeader: true, cell: (project) => project.name, sortValue: (project) => project.name },
  { id: "owner", header: "Owner", cell: (project) => project.owner, sortValue: (project) => project.owner },
  { id: "status", header: "Status", cell: (project) => project.status, sortValue: (project) => project.status },
];

export function DataTablePlayground() {
  const [rowCount, setRowCount] = useState("4");
  const code = `import { DataTable, type DataTableColumn } from "@hobiui/react";\n\ntype Project = { name: string; owner: string; status: string };\nconst projects: Project[] = [\n  { name: "Docs refresh", owner: "Maya", status: "In review" },\n  { name: "Token package", owner: "Arjun", status: "In progress" },\n  { name: "Icon catalog", owner: "Sam", status: "Ready" },\n  { name: "Component guides", owner: "Riya", status: "In progress" },\n];\n\nconst columns: DataTableColumn<Project>[] = [\n  { id: "name", header: "Project", rowHeader: true, cell: (row) => row.name, sortValue: (row) => row.name },\n  { id: "owner", header: "Owner", cell: (row) => row.owner, sortValue: (row) => row.owner },\n  { id: "status", header: "Status", cell: (row) => row.status, sortValue: (row) => row.status },\n];\n\n<DataTable caption="Projects" data={projects.slice(0, ${rowCount})} getRowId={(row) => row.name} columns={columns} />`;

  return (
    <ComponentPlayground
      title="Data table"
      description="Sort a column with its header button."
      code={code}
      controls={<SelectControl label="Rows" value={rowCount} options={["2", "4"]} onChange={setRowCount} />}
    >
      <DataTable
        caption="Projects"
        data={demoProjects.slice(0, Number(rowCount))}
        getRowId={(project) => project.name}
        columns={projectColumns}
      />
    </ComponentPlayground>
  );
}

export default ComponentPlayground;
