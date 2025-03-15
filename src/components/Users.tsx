import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface User {
  id: number;
  avatar: string;
}

interface StatusCard {
  key: string;
  count: string;
  status: string;
  badgeColor: string;
  textColor: string;
  showDot?: boolean;
  dotColor?: string;
}

const ActiveUsers: React.FC = () => {
  // Mock data for users
  const dummyUsers: User[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    avatar: "https://github.com/shadcn.png"
  }));

  // Status cards configuration
  const statusCards: StatusCard[] = [
    {
      key: "online",
      count: "18",
      status: "Online",
      badgeColor: "bg-green-100",
      textColor: "text-green-800",
      showDot: true,
      dotColor: "bg-green-600"
    },
    {
      key: "offline",
      count: "12",
      status: "Offline",
      badgeColor: "bg-gray-100",
      textColor: "text-gray-800",
      showDot: true,
      dotColor: "bg-gray-600"
    },
    {
      key: "pending",
      count: "04",
      status: "Pendings",
      badgeColor: "bg-yellow-100",
      textColor: "text-yellow-800"
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {statusCards.map((card) => (
          <Card key={card.key}>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium mb-4">Active Users</div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-6">
                    {dummyUsers.slice(0, 3).map((user) => (
                      <Avatar key={user.id} className="border-2 border-white">
                        <AvatarImage src={user.avatar} alt="User avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="ml-2">
                    <span className="font-bold">{card.count}</span>{" "}
                    <span className="text-xs">Users</span>
                  </div>
                  <Badge
                    className={`ml-auto ${card.badgeColor} ${card.textColor} px-2 flex items-center gap-1`}>
                    {card.showDot && (
                      <div
                        className={`w-2 h-2 rounded-full ${card.dotColor}`}></div>
                    )}
                    {card.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button className="bg-black hover:bg-gray-800 text-white rounded-md flex items-center gap-2">
          <Home className="h-4 w-4" />
          View users
        </Button>
      </div>
    </div>
  );
};

export default ActiveUsers;
