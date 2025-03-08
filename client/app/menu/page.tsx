"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  categoryApi,
  menuApi,
  tableApi,
  orderApi,
  type Category,
  type MenuItem,
  type Table,
  type OrderInput,
} from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function MenuPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const tableId = searchParams.get("table") || ""

  const [table, setTable] = useState<Table | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([])

  // Fetch table, categories, and menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Validate table ID
        if (!tableId) {
          toast({
            title: "Error",
            description: "No table selected. Please select a table first.",
            variant: "destructive",
          })
          router.push("/tables")
          return
        }

        // Fetch table
        const { table } = await tableApi.getTable(tableId)

        // Check if table is available
        if (table.status !== "available") {
          toast({
            title: "Table Unavailable",
            description: `Table ${table.table_number} is currently ${table.status}. Please select another table.`,
            variant: "destructive",
          })
          router.push("/tables")
          return
        }

        setTable(table)

        // Fetch categories
        const { categories } = await categoryApi.getAllCategories()

        // Sort categories by display_order
        const sortedCategories = [...categories].sort((a, b) => {
          if (a.display_order !== undefined && b.display_order !== undefined) {
            return a.display_order - b.display_order
          }
          return 0
        })

        setCategories(sortedCategories)

        // Fetch menu items
        const { menuItems } = await menuApi.getAllItems()

        // Group items by category
        const groupedItems: Record<string, MenuItem[]> = {}

        menuItems.forEach((item) => {
          const categoryId = item.category._id
          if (!groupedItems[categoryId]) {
            groupedItems[categoryId] = []
          }
          groupedItems[categoryId].push(item)
        })

        setMenuItems(groupedItems)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "Error",
          description: "Failed to load menu data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [tableId, toast, router])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item._id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prev, { id: item._id, name: item.name, price: item.price, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prev.filter((item) => item.id !== itemId)
      }
    })
  }

  const placeOrder = async () => {
    if (!table || cart.length === 0) return

    setIsPlacingOrder(true)
    try {
      // Prepare order items
      const orderItems = cart.map((item) => ({
        item: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      // Calculate total amount
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

      // Create order input
      const orderInput: OrderInput = {
        table: table._id,
        items: orderItems,
        total_amount: totalAmount,
      }

      // Place order
      await orderApi.createOrder(orderInput)

      // Show success message
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully!",
      })

      // Clear cart
      setCart([])

      // Redirect to confirmation page or home
      router.push(`/order-confirmation?table=${table._id}`)
    } catch (error) {
      console.error("Failed to place order:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading menu...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/tables">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="font-bold text-xl ml-2">FoodEase</span>
          </div>
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Your Order
                  {totalItems > 0 && <Badge className="absolute -top-2 -right-2">{totalItems}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Order - Table {table?.table_number}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const menuItem = Object.values(menuItems)
                                  .flat()
                                  .find((mi) => mi._id === item.id)
                                if (menuItem) {
                                  addToCart(menuItem)
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" onClick={placeOrder} disabled={isPlacingOrder}>
                        {isPlacingOrder ? "Placing Order..." : "Place Order"}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Menu - Table {table?.table_number}</h1>
          <p className="text-muted-foreground">Browse our menu and add items to your order</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center p-8 border rounded-md">
            <p className="text-muted-foreground">No menu categories available.</p>
          </div>
        ) : (
          <Tabs defaultValue={categories[0]?._id}>
            <TabsList className="mb-4 flex w-full overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category._id} value={category._id} className="flex-1">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category._id} value={category._id} className="space-y-4">
                {!menuItems[category._id] || menuItems[category._id].length === 0 ? (
                  <div className="text-center p-8 border rounded-md">
                    <p className="text-muted-foreground">No items in this category</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems[category._id]?.map((item) => (
                      <Card key={item._id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{item.name}</CardTitle>
                              <CardDescription className="mt-1">{item.description}</CardDescription>
                            </div>
                            <Image
                              src={item.image_url || "/placeholder.svg?height=100&width=100"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="font-bold">${item.price.toFixed(2)}</p>
                          {item.is_available === false && (
                            <p className="text-sm text-red-500 mt-1">Currently unavailable</p>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => addToCart(item)}
                            className="w-full"
                            disabled={item.is_available === false}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add to Order
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 FoodEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

