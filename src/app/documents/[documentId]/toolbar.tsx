"use client";

import { useEditorStore } from "@/store/use-editor-store";
import LinkButton from "@/components/toolbar/button/link";
import ImageButton from "@/components/toolbar/button/image";
import AlignButton from "@/components/toolbar/button/align";
import ListButton from "@/components/toolbar/button/list";
import TextColorButton from "@/components/toolbar/button/text-color";
import FontFamilyButton from "@/components/toolbar/button/font-family";
import HeadingLevelButton from "@/components/toolbar/button/heading-level";
import HighlightColorButton from "@/components/toolbar/button/highlight-color";
import ToolbarButton from "@/components/toolbar/button/toolbar-button";
import { Separator } from "@/components/ui/separator";
import {
	type LucideIcon,
	MessageSquarePlusIcon,
	Undo2Icon,
	Redo2Icon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	PrinterIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
} from "lucide-react";
import FontSizeButton from "@/components/toolbar/button/font-size";
import LineHeightButton from "@/components/toolbar/button/line-height";

export const Toolbar = () => {
	const { editor } = useEditorStore();

	// Helper to avoid repeating editor?.chain().focus()
	const chain = () => editor?.chain().focus();

	const toolbarSections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => chain()?.undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => chain()?.redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onClick: () => chain()?.toggleBold().run(),
				isActive: editor?.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				onClick: () => chain()?.toggleItalic().run(),
				isActive: editor?.isActive("italic"),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				onClick: () => chain()?.toggleUnderline().run(),
				isActive: editor?.isActive("underline"),
			},
			{
				label: "Strikethrough",
				icon: StrikethroughIcon,
				onClick: () => chain()?.toggleStrike().run(),
				isActive: editor?.isActive("strike"),
			},
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => chain()?.addPendingComment().run(),
				isActive: editor?.isActive("liveblocksCommentMark"),
			},
		],
		[
			{
				label: "Task List",
				icon: ListTodoIcon,
				onClick: () => chain()?.toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
		],
		[
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => chain()?.unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto">
			{toolbarSections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontSizeButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{toolbarSections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<TextColorButton />
			<HighlightColorButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<LinkButton />
			{toolbarSections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<ImageButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{toolbarSections[3].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<ListButton />
			<AlignButton />
			<LineHeightButton />
			{toolbarSections[4].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};
