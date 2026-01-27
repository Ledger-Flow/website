import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  media?: ReactNode;
  content?: ReactNode;
  className?: string;
}

const EmptyState = ({
  description = "Description",
  title = "Title",
  content,
  media,
  className,
}: EmptyStateProps) => {
  return (
    <Empty className={cn(className)}>
      <EmptyHeader>
        {!!media && <EmptyMedia>{media}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {!!content && <EmptyContent>{content}</EmptyContent>}
    </Empty>
  );
};

export default EmptyState;
