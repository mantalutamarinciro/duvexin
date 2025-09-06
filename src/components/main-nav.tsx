
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function MainNav() {
  const pathname = usePathname();
  
  return (
     <nav className="hidden lg:flex items-center gap-2">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={pathname === '/landing' || pathname === '/'}>
                        <Link href="/landing" className={navigationMenuTriggerStyle()}>
                            Accueil
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>À propos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                            <ListItem href="/a-propos-de-demenagement-du-vexin" title="Notre Entreprise">
                                Découvrez l'histoire et les valeurs de notre entreprise familiale.
                            </ListItem>
                            <ListItem href="/demenagement-du-vexin-evreux" title="Agence d'Évreux">
                                Notre antenne locale pour tous vos besoins en Normandie.
                            </ListItem>
                             <ListItem href="/zones-intervention" title="Zones d'intervention">
                                Voir toutes les zones que nous couvrons.
                            </ListItem>
                        </ul>
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
                    <NavigationMenuLink asChild active={pathname === '/zones-intervention'}>
                       <Link href="/zones-intervention" className={navigationMenuTriggerStyle()}>
                            Zones d'intervention
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/landing#contact" className={navigationMenuTriggerStyle()}>
                            Contact
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
     </nav>
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
