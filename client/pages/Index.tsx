
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
import { useNavigate } from "react-router-dom";
import { getPackages, ClassPackage } from "@/lib/mockData";

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
  const navigate = useNavigate();
  const packages = getPackages();
  const [selectedPackage, setSelectedPackage] = useState<ClassPackage>(packages[1]); // Default to middle option

  const handlePurchase = (pkg: ClassPackage) => {
    // Navigate to payment with package info
    navigate("/booking/payment", { state: { packageId: pkg.id, type: "package" } });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-white text-black">
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col pb-safe">
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
            <Tabs defaultValue="packages">
              <TabsList className="w-full justify-between rounded-full bg-gray-100 p-1 h-11">
                <TabsTrigger value="membership" className="flex-1 rounded-full text-sm">
                  Membership
                </TabsTrigger>
                <TabsTrigger
                  value="packages"
                  className="flex-1 rounded-full text-sm data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Packages
                </TabsTrigger>
                <TabsTrigger value="pt" className="flex-1 rounded-full text-sm">
                  PT Sessions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="packages" className="m-0 space-y-3 pt-3">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className="rounded-xl border-gray-200 cursor-pointer hover:border-black transition-colors" onClick={() => { setSelectedPackage(pkg); setOpen(true); }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{pkg.name}</h3>
                          <p className="text-sm text-gray-500">{pkg.description}</p>
                          <div className="mt-2 flex gap-2">
                            <Badge variant="secondary" className="font-normal">{pkg.creditCount} Credits</Badge>
                            <Badge variant="outline" className="font-normal">Valid {pkg.validityDays} Days</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl">{formatCurrency(pkg.price, pkg.currency)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Selected Package Drawer Details (reusing existing UI pattern) */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="rounded-t-2xl">
            <DrawerHeader className="text-left">
              <div className="flex items-start justify-between">
                <DrawerTitle>Package Details</DrawerTitle>
                <DrawerClose asChild>
                  <button aria-label="Close detail" className="p-1 rounded-full hover:bg-black/5">
                    <X className="h-5 w-5" />
                  </button>
                </DrawerClose>
              </div>
              <DrawerDescription />
            </DrawerHeader>

            <div className="px-4 pb-4 space-y-6">
              {selectedPackage && (
                <>
                  <section className="space-y-1">
                    <div className="text-lg font-semibold leading-none">{selectedPackage.name}</div>
                    <div className="text-sm text-gray-600">Valid for {selectedPackage.validityDays} days</div>
                    <div className="text-2xl font-bold mt-1">{formatCurrency(selectedPackage.price, selectedPackage.currency)}</div>
                    <div className="mt-2 text-sm text-gray-600">{selectedPackage.description}</div>
                  </section>

                  <section>
                    <h3 className="mb-2 text-sm font-semibold text-gray-800">Included Classes</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPackage.eligibleClasses.map((cls, idx) => (
                        <Badge key={idx} variant="secondary">{cls}</Badge>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            <DrawerFooter>
              <Button
                className="w-full bg-black text-white hover:bg-black/90"
                onClick={() => handlePurchase(selectedPackage)}
              >
                Purchase {selectedPackage?.name}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

      </div>
    </div>
  );
}

