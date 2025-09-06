
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
    href: "/services",
    description: "Solutions de stockage sécurisées pour courtes ou longues durées.",
    icon: <Warehouse className="h-6 w-6"/>
  },
  {
    title: "Objets Lourds & d'Art",
    href: "/services",
    description: "Transport spécialisé de pianos, coffres-forts et œuvres d'art.",
    icon: <Paintbrush className="h-6 w-6"/>
  },
]

export function MainNav() {
  return (
     <nav className="hidden lg:flex items-center gap-2">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/landing" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Accueil
                        </NavigationMenuLink>
                    </Link>
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
                                    <p className="text-muted-foreground text-sm">{service.description}</p>
                                </div>
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/landing#contact" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Contact
                        </NavigationMenuLink>
                    </Link>
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
