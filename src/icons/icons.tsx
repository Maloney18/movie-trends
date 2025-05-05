import { Box, Icon } from "@chakra-ui/react"
import Image from "next/image"
import Tv from '@/assets/tv.png'
import home from '@/assets/home.png'
import menu from '@/assets/menu.png'
import dropdown from '@/assets/dropdown.png'
import logout from '@/assets/logout.png'
import movie from '@/assets/movie.png'
import play from '@/assets/play.png'
import rating from '@/assets/rating.png'
import series from '@/assets/series.png'
import ticket from '@/assets/ticket.png'
import tomato from '@/assets/tomato.png'
import upcoming from '@/assets/upcoming.png'
import imdb from '@/assets/imdb.png'
import { Colors } from "@/components/color"

export const Logo = () => {
    return (
        <Image src={Tv} width={50} height={50} alt="trendy logo"/>
    )
}

export const Home = () => {
    return (
        <Image src={home} width={25} height={25} alt="home"/>
    )
}

export const Menu = () => {
    return (
        <Image src={menu} width={23} height={23} alt="menu"/>
    )
}

export const Logout = () => {
    return (
        <Image src={logout} width={30} height={30} alt="logout"/>
    )
}

export const Dropdown = () => {
    return (
        <Image src={dropdown} width={30} height={30} alt="dropdown"/>
    )
}

export const Play = () => {
    return (
        <Image src={play} width={54} height={54} alt="play"/>
    )
}

export const Rating = () => {
    return (
        <Image src={rating} width={30} height={30} alt="rating"/>
    )
}

export const Movie = () => {
    return (
        <Image src={movie} width={25} height={25} alt="movie"/>
    )
}

export const Ticket = () => {
    return (
        <Image src={ticket} width={25} height={25} alt="ticket"/>
    )
}

export const Tomato = () => {
    return (
        <Image src={tomato} width={16} height={17} alt="tomato"/>
    )
}

export const Upcoming = () => {
    return (
        <Image src={upcoming} width={25} height={25} alt="upcoming"/>
    )
}

export const Series = () => {
    return (
        <Image src={series} width={25} height={25} alt="series"/>
    )
}

export const Imdb = () => {
    return (
        <Image src={imdb} width={35} height={17} alt="imdb"/>
    )
}

export const Watch = () => {
    return (
        <Icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7.5547 5.16795C7.24784 4.96338 6.8533 4.94431 6.52814 5.11833C6.20298 5.29235 6 5.63121 6 6V10C6 10.3688 6.20298 10.7077 6.52814 10.8817C6.8533 11.0557 7.24784 11.0366 7.5547 10.8321L10.5547 8.83205C10.8329 8.64659 11 8.33435 11 8C11 7.66565 10.8329 7.35342 10.5547 7.16795L7.5547 5.16795Z" fill="white"/>
            </svg>
        </Icon>
    )
}

export const Search = () => {
    return (
        <Icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Icon>
    )
}

export const SeeMore = () => {
    return (
        <Icon>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.66668L7.33333 7.50001L1.5 13.3333" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Icon>
    )
}

export const Favorite = () => {
    return (
        <Box w={30} h={30} bg={Colors.light.greyBg} rounded='full'>
            <Icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z" fill="#D1D5DB"/>
                </svg>
            </Icon>
        </Box>
    )
}

