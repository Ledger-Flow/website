"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockTeamStatus } from "@/constant/team";
import { useTeam } from "@/context/team-context";
import { cn } from "@/lib/utils";
import { Member } from "@/types/members";
import { getRoleBadgeColor, getStatus } from "@/utils/team";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

const MembersCard = ({ members }: { members: Member[] }) => {
  const { teamDispatcher } = useTeam();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card
          key={member.id}
          className="hover:border-primary/50 transition-300"
        >
          <CardHeader className="px-5 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-1 items-center gap-3">
                <span className="relative size-10 shrink-0 overflow-clip rounded-full">
                  <Image alt={member.name} src={member.img} fill sizes="100%" />
                </span>
                <div>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {member.email}
                  </CardDescription>
                </div>
              </div>
              {member.role !== "Owner" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      {mockTeamStatus.map((status) => (
                        <DropdownMenuItem
                          disabled={member.status === status}
                          key={status}
                          className="cursor-pointer capitalize"
                          onClick={() =>
                            teamDispatcher({
                              type: "UPDATE_TEAM",
                              payload: { id: member.id, status: status },
                            })
                          }
                        >
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() =>
                        teamDispatcher({
                          type: "UPDATE_TEAM",
                          payload: { id: member.id, status: "delete" },
                        })
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5">
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-muted-foreground text-xs">Role</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${getRoleBadgeColor(member.role)}`}
              >
                {member.role}
              </span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 [&_svg]:size-4",
                getStatus(member.status).color,
              )}
            >
              {getStatus(member.status).icon}
              <span className={`text-sm font-medium capitalize`}>
                {member.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MembersCard;
