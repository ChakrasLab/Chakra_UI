import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../components/button/Button";
import { Checkbox } from "../components/checkbox/Checkbox";
import { DataTable } from "../components/data-table/DataTable";
import { Dialog } from "../components/dialog/Dialog";
import { Input } from "../components/input/Input";
import { Radio } from "../components/radio/Radio";
import { Select } from "../components/select/Select";
import { Switch } from "../components/switch/Switch";
import { Tabs } from "../components/tabs/Tabs";
import { Tooltip } from "../components/tooltip/Tooltip";

describe("Button", () => {
  it("keeps native button behavior and exposes its active state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button active variant="outline" onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-active", "true");
    expect(button).toHaveClass("chakra-button--outline");

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not activate when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("form controls", () => {
  it("marks an invalid input for assistive technology", () => {
    render(<><label htmlFor="email">Email</label><Input id="email" invalid /></>);

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });

  it("toggles a checkbox and connects its helper description", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" description="Required to continue" />);

    const checkbox = screen.getByRole("checkbox", { name: /Accept terms/ });
    const descriptionId = checkbox.getAttribute("aria-describedby");
    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId!)).toHaveTextContent("Required to continue");

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("keeps radio options in one native selection group", async () => {
    const user = userEvent.setup();
    render(<>
      <Radio name="plan" value="basic" label="Basic" />
      <Radio name="plan" value="pro" label="Pro" />
    </>);

    const basic = screen.getByRole("radio", { name: "Basic" });
    const pro = screen.getByRole("radio", { name: "Pro" });
    await user.click(basic);
    await user.click(pro);

    expect(pro).toBeChecked();
    expect(basic).not.toBeChecked();
  });

  it("exposes switch state and its description", async () => {
    const user = userEvent.setup();
    render(<Switch label="Email alerts" description="Receive weekly updates" />);

    const toggle = screen.getByRole("switch", { name: /Email alerts/ });
    expect(document.getElementById(toggle.getAttribute("aria-describedby")!)).toHaveTextContent("Receive weekly updates");
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("forwards labels and invalid state to the native select", async () => {
    const user = userEvent.setup();
    render(<>
      <label htmlFor="workspace">Workspace</label>
      <Select id="workspace" invalid defaultValue="docs">
        <option value="docs">Docs</option>
        <option value="components">Components</option>
      </Select>
    </>);

    const select = screen.getByRole("combobox", { name: "Workspace" });
    expect(select).toHaveAttribute("aria-invalid", "true");
    await user.selectOptions(select, "components");
    expect(select).toHaveValue("components");
  });
});

describe("Tabs", () => {
  it("changes the selected panel with arrow keys and skips disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs aria-label="Examples" items={[
      { value: "preview", label: "Preview", content: "Preview content" },
      { value: "disabled", label: "Disabled", content: "Hidden content", disabled: true },
      { value: "code", label: "Code", content: "Code content" },
    ]} />);

    const preview = screen.getByRole("tab", { name: "Preview" });
    await user.click(preview);
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Code" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Code content");
  });
});

describe("DataTable", () => {
  it("sorts rows and announces the active sort direction", async () => {
    const user = userEvent.setup();
    type PackageRow = { name: string; version: string };
    const columns = [
      { id: "name", header: "Name", rowHeader: true, sortValue: (row: PackageRow) => row.name, cell: (row: PackageRow) => row.name },
      { id: "version", header: "Version", cell: (row: PackageRow) => row.version },
    ];
    const data: PackageRow[] = [{ name: "Tokens", version: "0.1.0" }, { name: "Icons", version: "0.1.0" }];

    render(<DataTable<PackageRow>
      caption="Packages"
      columns={columns}
      data={data}
    />);

    const table = screen.getByRole("table", { name: "Packages" });
    const sortButton = within(table).getByRole("button", { name: /Name/ });
    await user.click(sortButton);
    expect(within(table).getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "ascending");
    expect(within(table).getAllByRole("rowheader").map((cell) => cell.textContent)).toEqual(["Icons", "Tokens"]);

    await user.click(sortButton);
    expect(within(table).getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "descending");
  });

  it("shows the configured empty state", () => {
    render(<DataTable caption="Empty list" columns={[]} data={[]} emptyMessage="Nothing here yet" />);
    expect(screen.getByRole("table", { name: "Empty list" })).toHaveTextContent("Nothing here yet");
  });
});

describe("Dialog and Tooltip", () => {
  it("exposes dialog title and description and reports close", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Dialog open title="Delete item" description="This cannot be undone." onOpenChange={onOpenChange}>
      <p>Confirm removal?</p>
    </Dialog>);

    const dialog = screen.getByRole("dialog", { name: "Delete item" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("associates tooltip help with its trigger", () => {
    render(<Tooltip content="Search by name">
      <button type="button">Search</button>
    </Tooltip>);

    const trigger = screen.getByRole("button", { name: "Search" });
    const tooltipId = trigger.getAttribute("aria-describedby");
    expect(tooltipId).toBeTruthy();
    expect(document.getElementById(tooltipId!)).toHaveAttribute("role", "tooltip");
    expect(document.getElementById(tooltipId!)).toHaveTextContent("Search by name");
  });
});
