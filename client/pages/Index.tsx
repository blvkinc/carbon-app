import { useMemo, useState } from "react";
import { ArrowLeft, X, Users, Tag, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Domain types
interface Category {
  pivot_id: number;
  facility_service_pivot_id: number;
  is_main_service: boolean;
  category_id: number;
  category_name: string;
}
interface Service {
  service_id: number;
  service_name: string;
  categories: Category[];
}
interface DayPassData {
  id: number;
  name: string;
  type: "group" | "single" | string;
  price: string;
  no_of_users: number;
  validity_in_days: number;
  is_classes_included: boolean;
  additional_note: string;
  services: Service[];
  amenities: string[];
  pricings: { one_time_price_id: number };
}

const data: DayPassData = {
  id: 1,
  name:
    "Id ex eos alias ipsam rerum quo. Ratione et asperiores doloribus nemo. Cum et architecto autem. day pass",
  type: "group",
  price: "1291.3800",
  no_of_users: 4,
  validity_in_days: 90,
  is_classes_included: false,
  additional_note:
    "This pass will use all available amenities and classes in 90day for 4 persons",
  services: [
    {
      service_id: 4,
      service_name: "Yoga",
      categories: [
        {
          pivot_id: 3,
          facility_service_pivot_id: 3,
          is_main_service: true,
          category_id: 1,
          category_name: "Prenatal",
        },
        {
          pivot_id: 5,
          facility_service_pivot_id: 5,
          is_main_service: false,
          category_id: 3,
          category_name: "Beginner Friendly",
        },
      ],
    },
    {
      service_id: 6,
      service_name: "Barre",
      categories: [
        {
          pivot_id: 1,
          facility_service_pivot_id: 1,
          is_main_service: true,
          category_id: 1,
          category_name: "Prenatal",
        },
      ],
    },
  ],
  amenities: [
    "Billiards Table Unit 1",
    "Billiards Table Unit 2",
    "Athletics Track Unit 2",
    "Bike Racks",
    "ATM",
  ],
  pricings: {
    one_time_price_id: 13,
  },
};

function formatCurrency(value: string | number, currency = "AED") {
  const num = typeof value === "string" ? Number(value) : value;
  try {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    })
      .format(num)
      .replace(/\u00A0/g, " ");
  } catch {
    return `${currency} ${num.toFixed(2)}`;
  }
}

function clampText(text: string, max = 80) {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export default function Index() {
  const [open, setOpen] = useState(false);

  const priceLabel = useMemo(() => formatCurrency(data.price, "AED"), []);
  const personsLabel = useMemo(
    () => `${data.no_of_users} ${data.no_of_users > 1 ? "persons" : "person"}`,
    [],
  );
  const validityLabel = useMemo(
    () => `Valid for ${data.validity_in_days} day${data.validity_in_days > 1 ? "s" : ""}`,
    [],
  );

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="flex items-center justify-between px-4 py-3">
            <button aria-label="Back" className="p-1 rounded-full hover:bg-black/5">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="text-base font-semibold">Booking</div>
            <button aria-label="Close" className="p-1 rounded-full hover:bg-black/5">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pb-3">
            <Tabs defaultValue="daypasses">
              <TabsList className="w-full justify-between rounded-full bg-gray-100 p-1 h-11">
                <TabsTrigger value="membership" className="flex-1 rounded-full text-sm">
                  Membership
                </TabsTrigger>
                <TabsTrigger
                  value="daypasses"
                  className="flex-1 rounded-full text-sm data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Daypasses
                </TabsTrigger>
                <TabsTrigger value="pt" className="flex-1 rounded-full text-sm">
                  PT Sessions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="daypasses" className="m-0" />
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 space-y-3 px-4 pb-28">
          <Card className="rounded-xl border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h2 className="text-base font-semibold leading-tight">
                      {clampText(data.name, 50)}
                    </h2>
                    <Badge className="bg-accent text-accent-foreground border-none">{data.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    {clampText(data.additional_note, 96)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold tracking-tight">{priceLabel}</span>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        <Users className="h-3.5 w-3.5" /> {personsLabel}
                      </span>
                    </div>
                    <div>
                      <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                          <Button variant="ghost" className="h-9 px-3 text-sm">
                            <Info className="h-4 w-4" /> More Info
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="rounded-t-2xl">
                          <DrawerHeader className="text-left">
                            <div className="flex items-start justify-between">
                              <DrawerTitle>Pass Detail</DrawerTitle>
                              <DrawerClose asChild>
                                <button aria-label="Close detail" className="p-1 rounded-full hover:bg-black/5">
                                  <X className="h-5 w-5" />
                                </button>
                              </DrawerClose>
                            </div>
                            <DrawerDescription />
                          </DrawerHeader>

                          <div className="px-4 pb-4 space-y-6">
                            <section className="space-y-1">
                              <div className="text-lg font-semibold leading-none">{clampText(data.name, 60)}</div>
                              <div className="text-sm text-gray-600">{validityLabel}</div>
                              <div className="text-2xl font-bold mt-1">{priceLabel}</div>
                              <div className="mt-2 text-sm text-gray-600">{data.additional_note}</div>
                            </section>

                            <section>
                              <h3 className="mb-2 text-sm font-semibold text-gray-800">Classes</h3>
                              <p className="text-sm">
                                {data.is_classes_included ? "All classes included" : "Classes not included"}
                              </p>
                            </section>

                            <section>
                              <h3 className="mb-2 text-sm font-semibold text-gray-800">Services included</h3>
                              <div className="space-y-3">
                                {data.services.map((s) => (
                                  <div key={s.service_id} className="rounded-lg border p-3">
                                    <div className="flex items-center gap-2">
                                      <Tag className="h-4 w-4 text-gray-500" />
                                      <div className="font-medium">{s.service_name}</div>
                                    </div>
                                    {s.categories.length > 0 && (
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {s.categories.map((c) => (
                                          <span
                                            key={`${s.service_id}-${c.category_id}-${c.pivot_id}`}
                                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${
                                              c.is_main_service
                                                ? "bg-black text-white border-black"
                                                : "bg-gray-50 text-gray-700 border-gray-200"
                                            }`}
                                          >
                                            {c.category_name}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </section>

                            <section>
                              <h3 className="mb-2 text-sm font-semibold text-gray-800">Amenities included</h3>
                              <ul className="space-y-2">
                                {data.amenities.map((a, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-black" /> {a}
                                  </li>
                                ))}
                              </ul>
                            </section>
                          </div>

                          <DrawerFooter>
                            <Button className="w-full bg-black text-white hover:bg-black/90">Buy Day Pass</Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="mx-auto max-w-md px-4 py-3">
            <Button
              className="w-full h-12 rounded-full bg-black text-white hover:bg-black/90"
              onClick={() => setOpen(true)}
            >
              Buy Day Pass
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
