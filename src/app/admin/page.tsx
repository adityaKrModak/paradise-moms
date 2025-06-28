import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  FolderTree,
  Star,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Categories",
    value: "24",
    change: "+2",
    changeType: "positive" as const,
    icon: FolderTree,
  },
  {
    title: "Reviews",
    value: "5,678",
    change: "+23%",
    changeType: "positive" as const,
    icon: Star,
  },
  {
    title: "Orders",
    value: "890",
    change: "-5%",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+18%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-green-100 hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <span
                  className={`font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  New product &quot;Organic Apples&quot; added
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  Category &quot;Fruits&quot; updated
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">5 new reviews received</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Organic Bananas</span>
                <span className="text-sm font-medium text-red-600">5 left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fresh Spinach</span>
                <span className="text-sm font-medium text-red-600">3 left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Whole Milk</span>
                <span className="text-sm font-medium text-orange-600">
                  8 left
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Organic Tomatoes</span>
                <span className="text-sm font-medium text-green-600">
                  234 sold
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fresh Carrots</span>
                <span className="text-sm font-medium text-green-600">
                  189 sold
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Green Lettuce</span>
                <span className="text-sm font-medium text-green-600">
                  156 sold
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}