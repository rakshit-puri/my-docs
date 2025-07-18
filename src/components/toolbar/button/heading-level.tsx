"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";
import { Level } from "@tiptap/extension-heading";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const HeadingLevelButton = () => {
	const { editor } = useEditorStore();
	const headingLevels = [
		{ label: "Normal Text", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "20px" },
		{ label: "Heading 4", value: 4, fontSize: "18px" },
		{ label: "Heading 5", value: 5, fontSize: "16px" },
	];

	const getCurrentHeading = () => {
		for (let level = 0; level <= 5; level++) {
			if (editor?.isActive("heading", { level })) {
				return `Heading ${level}`;
			}
		}

		return "Normal Text";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDownIcon className="size-4 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headingLevels.map(({ label, value, fontSize }) => (
					<button
						key={value}
						style={{ fontSize }}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							(value == 0 && editor?.isActive("heading")) ||
								(editor?.isActive("heading", { level: value }) && "bg-neutral-200/80")
						)}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HeadingLevelButton;
