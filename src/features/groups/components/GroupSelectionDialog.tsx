"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ListChecksIcon,
  Loader2Icon,
  SearchIcon,
  UsersRoundIcon,
} from "lucide-react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TextInput from "@/components/ui/text-input";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import { useGetLists } from "@/features/list/services/listService";
import { useGetUsers } from "@/features/users/services/userService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { useDebounce } from "use-debounce";

type SelectionItem = {
  id: string;
  title: string;
  subtitle?: string;
};

const avatarPalettes = [
  { bg: "#DAF4F6", fg: "#147B8A" },
  { bg: "#E0EAFF", fg: "#1D4ED8" },
  { bg: "#FDEAD7", fg: "#B54708" },
  { bg: "#FCE7F3", fg: "#BE185D" },
];

const getInitials = (label: string) =>
  label
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

const GroupSelectionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  fieldLabel,
  triggerLabel,
  searchPlaceholder,
  submitLabel,
  emptyTitle,
  emptyDescription,
  emptyKind,
  items = [],
  initialSelectedIds,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  fieldLabel: string;
  triggerLabel: string;
  searchPlaceholder: string;
  submitLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyKind: "members" | "lists";
  items?: SelectionItem[];
  initialSelectedIds?: string[];
  onSubmit: (selectedIds: string[]) => void;
}) => {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebounce(query, 400);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    initialSelectedIds ?? [],
  );
  const initialSelectedKey = React.useMemo(
    () => (initialSelectedIds ?? []).slice().sort().join(","),
    [initialSelectedIds],
  );
  const usesUserQuery = emptyKind === "members";
  const usesListQuery = emptyKind === "lists";

  const {
    data: usersData,
    isPending: isUsersPending,
    hasNextPage: usersHasNextPage,
    fetchNextPage: usersFetchNextPage,
  } = useGetUsers({
    limit: 20,
    search: usesUserQuery ? debouncedQuery.trim() || undefined : undefined,
    role: "sales_person",
    status: "active",
  });

  const {
    data: listsData,
    isPending: isListsPending,
    hasNextPage: listsHasNextPage,
    fetchNextPage: listsFetchNextPage,
  } = useGetLists({
    limit: 20,
    list_type: "shared",
    search: usesListQuery ? debouncedQuery.trim() || undefined : undefined,
    status: "active",
  });

  const fetchNextPage = usesUserQuery ? usersFetchNextPage : listsFetchNextPage;

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIds((current) => {
        const next = initialSelectedIds ?? [];
        const currentKey = [...current].sort().join(",");
        return currentKey === initialSelectedKey ? current : next;
      });
    } else {
      setPickerOpen(false);
    }
  }, [initialSelectedIds, initialSelectedKey, open]);

  const resolvedItems = React.useMemo(() => {
    if (usesUserQuery) {
      const users = transformInfiniteData(usersData, "data");
      return users.map((user) => ({
        id: user.id,
        title: `${user.first_name} ${user.last_name}`,
        subtitle: user.email,
      }));
    }

    if (usesListQuery) {
      const lists = transformInfiniteData(listsData, "data");
      return lists.map((list) => ({
        id: list.id,
        title: list.name,
        subtitle: `Priority ${list.priority}`,
      }));
    }

    const search = query.trim().toLowerCase();
    if (!search) return items;
    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(search);
      const subtitleMatch = item.subtitle?.toLowerCase().includes(search);
      return titleMatch || subtitleMatch;
    });
  }, [items, listsData, query, usersData, usesListQuery, usesUserQuery]);

  const toggleItem = React.useCallback((itemId: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(itemId) ? current : [...current, itemId];
      }
      return current.filter((value) => value !== itemId);
    });
  }, []);

  const resolvedTriggerLabel =
    selectedIds.length > 0 ? `${selectedIds.length} selected` : triggerLabel;
  const newSelectedIds = selectedIds;
  const shouldShowUsersLoading =
    (usesUserQuery && isUsersPending) || (usesListQuery && isListsPending);

  const EmptyIcon = emptyKind === "members" ? UsersRoundIcon : ListChecksIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.selectionDialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>
              {title}
            </DialogTitle>
            <DialogDescription className={groupsStyles.dialogSubtitle}>
              {description}
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={groupsStyles.dialogBody}>
          <div className={groupsStyles.formGrid}>
            <div className={groupsStyles.fieldGroup}>
              <span className={groupsStyles.fieldLabel}>{fieldLabel}</span>

              <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className={groupsStyles.memberTrigger}
                    >
                      <span>{resolvedTriggerLabel}</span>
                      {pickerOpen ? (
                        <ChevronUpIcon className="size-6 text-panel-muted" />
                      ) : (
                        <ChevronDownIcon className="size-6 text-panel-muted" />
                      )}
                    </button>
                  }
                />

                <DropdownMenuContent
                  className={`${groupsStyles.memberPanel} w-(--anchor-width) p-0`}
                  sideOffset={8}
                >
                  <div className="px-3 pt-3" onKeyDown={(e) => e.stopPropagation()}>
                    <TextInput
                      startIcon={
                        <SearchIcon className="size-6 text-panel-muted" />
                      }
                      placeholder={searchPlaceholder}
                      value={query}
                      setValue={setQuery}
                    />
                  </div>

                  {shouldShowUsersLoading ? (
                    <div className="flex items-center justify-center px-4 py-8">
                      <Loader2Icon className="size-6 animate-spin text-secondary" />
                    </div>
                  ) : resolvedItems.length ? (
                    <div
                      id="group-selection-scroll-area"
                      className={groupsStyles.memberList}
                    >
                      <InfiniteScroll
                        dataLength={resolvedItems.length}
                        next={() => void fetchNextPage()}
                        hasMore={
                          usesUserQuery
                            ? Boolean(usersHasNextPage)
                            : usesListQuery
                              ? Boolean(listsHasNextPage)
                              : false
                        }
                        loader={
                          <div className="flex items-center justify-center px-4 py-4">
                            <Loader2Icon className="size-5 animate-spin text-secondary" />
                          </div>
                        }
                        scrollThreshold="120px"
                        scrollableTarget="group-selection-scroll-area"
                      >
                        {resolvedItems.map((item, index) => {
                          const checked = selectedIds.includes(item.id);
                          const palette =
                            avatarPalettes[index % avatarPalettes.length];

                          return (
                            <label
                              key={item.id}
                              className={groupsStyles.selectionRow}
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(value) =>
                                  toggleItem(item.id, Boolean(value))
                                }
                                className="size-7 rounded-[8px] border-border data-checked:border-primary data-checked:bg-primary disabled:opacity-100"
                              />
                              {emptyKind === "members" ? (
                                <div
                                  className={groupsStyles.avatar}
                                  style={{
                                    backgroundColor: palette.bg,
                                    color: palette.fg,
                                  }}
                                >
                                  {getInitials(item.title)}
                                </div>
                              ) : (
                                <div
                                  className={groupsStyles.listCheckboxSpacer}
                                />
                              )}
                              <div>
                                <div className={groupsStyles.assignmentTitle}>
                                  {item.title}
                                </div>
                                {item.subtitle ? (
                                  <div className={groupsStyles.assignmentMeta}>
                                    {item.subtitle}
                                  </div>
                                ) : null}
                              </div>
                            </label>
                          );
                        })}
                      </InfiniteScroll>
                    </div>
                  ) : (
                    <div className={groupsStyles.selectionEmptyState}>
                      <div className={groupsStyles.selectionEmptyIconWrap}>
                        <EmptyIcon className="size-10 text-[#1795A1]" />
                      </div>
                      <div className={groupsStyles.selectionEmptyTitle}>
                        {emptyTitle}
                      </div>
                      <div className={groupsStyles.selectionEmptyDescription}>
                        {emptyDescription}
                      </div>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className={groupsStyles.dialogFooter}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!newSelectedIds.length}
            onClick={() => {
              onSubmit(newSelectedIds);
            }}
          >
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSelectionDialog;
