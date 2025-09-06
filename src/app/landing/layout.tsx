
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, ChevronDown, Map, Building, Paintbrush, Truck, Globe, Warehouse, Wrench } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const services: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
  {
    title: "Déménagement de Particuliers",
    href: "/services",
    description: "Solutions locales, nationales et internationales pour votre résidence.",
    icon: <Map className="h-6 w-6"/>
  },
  {
    title: "Déménagement d'Entreprise",
    href: "/demenagement-entreprise-bureau",
    description: "Transfert de bureaux, archives et matériel professionnel.",
    icon: <Building className="h-6 w-6"/>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
            <div className="bg-primary text-primary-foreground">
                <div className="container h-10 flex items-center justify-center">
                     <a href="tel:+33130751235" className="flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
                        <Phone className="h-4 w-4" />
                        <span>Appelez-nous maintenant (+33)1 30 75 12 35</span>
                    </a>
                </div>
            </div>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Logo />
                    <nav className="hidden lg:flex items-center gap-2">
                       <NavigationMenu>
                          <NavigationMenuList>
                             <NavigationMenuItem>
                               <Link href="/landing" legacyBehavior passHref>
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
                                        className="flex items-start gap-4"
                                      >
                                        <div className="text-primary mt-1">{service.icon}</div>
                                        <div className="flex-1">
                                          <p className="font-semibold">{service.title}</p>
                                          <p className="text-xs text-muted-foreground">{service.description}</p>
                                        </div>
                                      </ListItem>
                                    ))}
                                  </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                             <NavigationMenuItem>
                               <Link href="/landing#contact" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Contact
                                </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                       </NavigationMenu>
                    </nav>
                     <Button asChild>
                        <Link href="/dashboard/quote">Obtenir un devis</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t bg-muted/50">
                <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="md:col-span-1">
                     <Logo />
                     <p className="text-sm text-muted-foreground mt-4">
                        Votre partenaire de confiance pour un déménagement sans stress.
                     </p>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Agence Île-de-France</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> 9 Rue de Pontoise, 95540 Méry-sur-Oise</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0"/> (+33)1 30 75 12 35</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/> contact@demenagementduvexin.fr</p>
                        </div>
                   </div>
                    <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Agence Normandie</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> 22 Rue Isambard, 27000 Évreux, Normandie</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0"/> (+33) 3 74 47 44 77</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/> demenagementduvexin@evreux.fr</p>
                            <Link href="/demenagement-du-vexin-evreux" className="text-primary font-semibold hover:underline text-xs pt-1">En savoir plus...</Link>
                        </div>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Navigation</h4>
                        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                           <Link href="/landing" className="hover:text-primary">Accueil</Link>
                           <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">A propos</Link>
                           <Link href="/services" className="hover:text-primary">Services</Link>
                           <Link href="/landing#contact" className="hover:text-primary">Contact</Link>
                           <Link href="/dashboard/quote" className="hover:text-primary">Devis</Link>
                        </div>
                   </div>
                </div>
                <div className="border-t">
                    <div className="container py-4 text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Déménagement Du Vexin. Réalisé avec ❤️ par Creow.
                    </div>
                </div>
            </footer>
        </div>
    );
}

const ListItemOld = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItemOld.displayName = "ListItem"
