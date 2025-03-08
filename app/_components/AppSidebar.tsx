import React from 'react'
import withAuth from '../withAuth'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ArrowUpRight } from 'lucide-react'
import { Calendar,DollarSignIcon,Coins,Paintbrush,Home, Inbox, Search, Settings,LayoutDashboard } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard, 
    },
    {
        title: "Workspace",
        url: "/workspace",
        icon: Home,
    },
    {
        title: "Design",
        url: "/designs",
        icon: Paintbrush,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: DollarSignIcon,
    },
]

export function AppSidebar() {
    const path=usePathname();
    console.log(path);
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                <div className="flex " ><ArrowUpRight  width={32} height={30} className="bg-black text-white rounded  mr-2 p-1"/> <div className="text-xl mr-2 font-bold">CodeGen AI</div></div>
                    <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path==item.url&&'bg-gray-200'} `}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'>Copyright @manish bhargava</h2>
            </SidebarFooter>
        </Sidebar>
    )
}
