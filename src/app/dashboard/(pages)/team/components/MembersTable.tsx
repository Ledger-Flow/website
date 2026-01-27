"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from "@/types/members";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getRoleBadgeColor, getStatus } from "@/utils/team";
import { mockTeamStatus } from "@/constant/team";
import { useTeam } from "@/context/team-context";

const MembersTable = ({ members }: { members: Member[] }) => {
  const { teamDispatcher } = useTeam();

  return (
    <Card>
      <CardContent className="px-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <span className="relative inline-block size-8.75 overflow-clip rounded-full">
                    <Image
                      alt={member.name}
                      src={member.img}
                      fill
                      sizes="100%"
                    />
                  </span>
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(member.role)}`}
                  >
                    {member.role}
                  </span>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center gap-2 capitalize",
                      getStatus(member.status).color,
                    )}
                  >
                    {getStatus(member.status).icon}
                    <span className={`text-sm font-medium`}>
                      {member.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MembersTable;
