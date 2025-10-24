
"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building,
  Globe,
  Map,
  Paintbrush,
  Warehouse,
  Home,
  BriefcaseBusiness,
  Truck,
  Package,
  Calculator,
  Camera,
  Trophy,
  BookOpen,
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import Image from "next/image"

const services: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
  {
    title: "Déménagement de Particuliers",
    href: "/demenagement-particuliers",
    description: "Solutions locales, nationales et internationales pour votre résidence.",
    icon: <Home className="h-6 w-6"/>
  },
  {
    title: "Déménagement d'Entreprise",
    href: "/demenagement-entreprise-bureau",
    description: "Transfert de bureaux, archives et matériel professionnel.",
    icon: <BriefcaseBusiness className="h-6 w-6"/>
  },
  {
    title: "Garde-Meubles & Stockage",
    href: "/demenagement-garde-meubles",
    description: "Solutions de stockage sécurisées pour courtes ou longues durées.",
    icon: <Warehouse className="h-6 w-6"/>
  },
   {
    title: "Transport d'Objets Lourds",
    href: "/demenagement-objets-lourds",
    description: "Transport spécialisé de pianos, coffres-forts et œuvres d'art.",
    icon: <Package className="h-6 w-6"/>
  },
  {
    title: "Déménagement d'Œuvres d'Art",
    href: "/demenagement-oeuvres-art",
    description: "Un savoir-faire unique pour le transport de vos objets les plus précieux.",
    icon: <Paintbrush className="h-6 w-6"/>
  },
]

const aboutItems: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
        title: "Nos Réalisations",
        href: "/nos-realisations",
        description: "Voir des exemples concrets de notre savoir-faire.",
        icon: <BookOpen className="h-6 w-6"/>
    },
    {
        title: "Galerie Photos",
        href: "/galerie",
        description: "Découvrez notre équipe et notre matériel en images.",
        icon: <Camera className="h-6 w-6"/>
    },
    {
        title: "Agence d'Évreux",
        href: "/demenagement-du-vexin-evreux",
        description: "Notre antenne locale pour tous vos besoins en Normandie.",
        icon: <Building className="h-6 w-6"/>
    }
]

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
        {/* Mobile Menu */}
        <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Navigation</SheetTitle>
                    </SheetHeader>
                    <nav className="grid gap-4 text-lg font-medium mt-8">
                         <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Accueil</Link>
                         <Link href="/a-propos-de-demenagement-du-vexin" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Notre Entreprise</Link>
                         <Link href="/services" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Services</Link>
                         <Link href="/calculateur-volume" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Calculateur de volume</Link>
                         <Link href="/zones-intervention" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Zones d'intervention</Link>
                         <Link href="/blog" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Blog</Link>
                         <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">Contact</Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/" className={navigationMenuTriggerStyle()}>
                                Accueil
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>À propos</NavigationMenuTrigger>
                        <NavigationMenuContent>
                             <div className="grid md:grid-cols-2 gap-3 p-4 md:w-[600px] lg:w-[700px]">
                                <div className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link href="/a-propos-de-demenagement-du-vexin" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                            <Trophy className="h-8 w-8 text-primary"/>
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                Déménagement du Vexin
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Découvrez l'histoire, les valeurs et les visages qui font de notre entreprise familiale votre partenaire de confiance.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                                {aboutItems.map((item) => (
                                    <ListItem
                                        key={item.title}
                                        title={item.title}
                                        href={item.href}
                                    >
                                         <div className="flex items-start gap-3">
                                            <div className="text-primary">{item.icon}</div>
                                            <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
                                        </div>
                                    </ListItem>
                                ))}
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {services.map((service) => (
                                <ListItem
                                    key={service.title}
                                    title={service.title}
                                    href={service.href}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="text-primary">{service.icon}</div>
                                        <p className="text-muted-foreground text-sm leading-snug">{service.description}</p>
                                    </div>
                                </ListItem>
                            ))}
                            <li className="md:col-span-2">
                                <NavigationMenuLink asChild>
                                    <Link href="/services" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                        <div className="text-sm font-medium">
                                            Voir tous nos services
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                        <Link href="/calculateur-volume" className={navigationMenuTriggerStyle()}>
                                Calculateur de volume
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                        <Link href="/zones-intervention" className={navigationMenuTriggerStyle()}>
                                Zones d'intervention
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                        <Link href="/blog" className={navigationMenuTriggerStyle()}>
                                Blog
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                            <Link href="/#contact" className={navigationMenuTriggerStyle()}>
                                Contact
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
         <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
