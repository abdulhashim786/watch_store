import { NextResponse } from "next/server"
import type { Product } from "@/types/product"

const SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1ScaHTlhjobaMrF_hTnnmB6Sok55FzOqFwU0igKSqWTI/export?format=csv&gid=1834399994"

const MOCK_PRODUCTS: Product[] = [
  {
    id: "rolex-submariner-001",
    name: "Submariner Date",
    brand: "Rolex",
    modelNumber: "126610LN",
    type: "Diving",
    caseMaterial: "Oystersteel",
    strapMaterial: "Oystersteel",
    dialColor: "Black",
    strapColor: "Steel",
    price: 9550,
    discount: 0,
    finalPrice: 9550,
    warranty: "5 years",
    stockQuantity: 3,
    description:
      "The Submariner Date is a legendary diving watch with a unidirectional rotatable bezel and Chromalight display for enhanced legibility underwater.",
    images: ["/black-diving-watch.png"],
  },
  {
    id: "omega-speedmaster-002",
    name: "Speedmaster Professional",
    brand: "Omega",
    modelNumber: "310.30.42.50.01.001",
    type: "Chronograph",
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    dialColor: "Black",
    strapColor: "Steel",
    price: 6350,
    discount: 5,
    finalPrice: 6032.5,
    warranty: "5 years",
    stockQuantity: 7,
    description:
      "The legendary Moonwatch worn by astronauts. Features a manual-winding chronograph movement and hesalite crystal.",
    images: ["/placeholder-ngk5u.png"],
  },
  {
    id: "patek-philippe-003",
    name: "Calatrava",
    brand: "Patek Philippe",
    modelNumber: "5227G-001",
    type: "Dress",
    caseMaterial: "White Gold",
    strapMaterial: "Leather",
    dialColor: "Silver",
    strapColor: "Black",
    price: 32400,
    discount: 0,
    finalPrice: 32400,
    warranty: "2 years",
    stockQuantity: 1,
    description:
      "The epitome of elegance and sophistication. This dress watch features a clean, minimalist design with exceptional craftsmanship.",
    images: ["/patek-philippe-calatrava-white-gold.png"],
  },
  {
    id: "audemars-piguet-004",
    name: "Royal Oak",
    brand: "Audemars Piguet",
    modelNumber: "15500ST.OO.1220ST.01",
    type: "Sport",
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    dialColor: "Blue",
    strapColor: "Steel",
    price: 27800,
    discount: 0,
    finalPrice: 27800,
    warranty: "2 years",
    stockQuantity: 2,
    description:
      "Iconic octagonal bezel design with 'Grande Tapisserie' pattern dial. A masterpiece of luxury sports watch design.",
    images: ["/audemars-piguet-royal-oak-blue-steel.png"],
  },
  {
    id: "cartier-santos-005",
    name: "Santos de Cartier",
    brand: "Cartier",
    modelNumber: "WSSA0029",
    type: "Dress",
    caseMaterial: "Stainless Steel",
    strapMaterial: "Leather",
    dialColor: "Silver",
    strapColor: "Black",
    price: 4050,
    discount: 10,
    finalPrice: 3645,
    warranty: "2 years",
    stockQuantity: 5,
    description:
      "Inspired by aviation pioneer Alberto Santos-Dumont. Features the signature square case and Roman numeral dial.",
    images: ["/placeholder-o7nbf.png"],
  },
  {
    id: "tag-heuer-monaco-006",
    name: "Monaco",
    brand: "TAG Heuer",
    modelNumber: "CAW2111.FC6183",
    type: "Chronograph",
    caseMaterial: "Stainless Steel",
    strapMaterial: "Leather",
    dialColor: "Blue",
    strapColor: "Blue",
    price: 5900,
    discount: 8,
    finalPrice: 5428,
    warranty: "2 years",
    stockQuantity: 4,
    description: "The iconic square chronograph made famous by Steve McQueen. Features automatic chronograph movement.",
    images: ["/tag-heuer-monaco-blue.png"],
  },
]

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
    console.log("[v0] Attempting to fetch from Google Sheets...")

    let response = await fetch(SHEETS_CSV_URL, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "text/csv,text/plain,application/csv,*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      redirect: "manual", // Handle redirects manually
      cache: "no-cache",
    })

    console.log("[v0] Response status:", response.status)

    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get("location")
      if (location) {
        console.log("[v0] Following redirect to:", location)
        response = await fetch(location, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "text/csv,text/plain,application/csv,*/*",
            "Accept-Language": "en-US,en;q=0.9",
          },
          cache: "no-cache",
        })
        console.log("[v0] Redirect response status:", response.status)
      } else {
        throw new Error(`Redirect response (${response.status}) but no location header found`)
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Google Sheets access denied (401). Please ensure your Google Sheet is publicly accessible. Go to your Google Sheet → Share → Change to "Anyone with the link" → Viewer access.`,
        )
      } else if (response.status === 403) {
        throw new Error(`Google Sheets access forbidden (403). The sheet may be private or have restricted access.`)
      } else if (response.status === 404) {
        throw new Error(`Google Sheets not found (404). Please check the sheet ID in the URL.`)
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }

    const csvText = await response.text()
    console.log("[v0] Successfully fetched CSV data, length:", csvText.length)
    console.log("[v0] First 200 characters:", csvText.substring(0, 200))

    if (!csvText || csvText.trim().length === 0) {
      throw new Error("Empty CSV data received from Google Sheets")
    }

    const lines = csvText.split("\n").filter((line) => line.trim())
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row")
    }

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const products: Product[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = parseCSVLine(line)
      if (values.length < headers.length) continue

      const product: Product = {
        id: values[0] || `product-${i}`,
        name: values[1] || "",
        brand: values[2] || "",
        modelNumber: values[3] || "",
        type: (values[4] as Product["type"]) || "Analog",
        caseMaterial: values[5] || "",
        strapMaterial: values[6] || "",
        dialColor: values[7] || "",
        strapColor: values[8] || "",
        price: Number.parseFloat(values[9]) || 0,
        discount: Number.parseFloat(values[10]) || 0,
        finalPrice: Number.parseFloat(values[11]) || Number.parseFloat(values[9]) || 0,
        warranty: values[12] || "",
        stockQuantity: Number.parseInt(values[13]) || 0,
        description: values[14] || "",
        images: values[15]
          ? values[15].split("|").filter((img) => img.trim())
          : [`/placeholder.svg?height=400&width=400&query=${values[1] || "luxury watch"}`],
      }

      products.push(product)
    }

    console.log("[v0] Successfully parsed", products.length, "products from sheets")
    return products
  } catch (error) {
    console.error("[v0] Error fetching from sheets:", error)
    console.log("[v0] Falling back to mock data")
    return MOCK_PRODUCTS
  }
}

export async function GET() {
  try {
    const products = await fetchProductsFromSheets()
    return NextResponse.json(products)
  } catch (error) {
    console.error("[v0] API route error:", error)
    return NextResponse.json({
      products: MOCK_PRODUCTS,
      error: error instanceof Error ? error.message : "Unknown error",
      usingMockData: true,
    })
  }
}
