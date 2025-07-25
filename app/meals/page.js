import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from "@/components/meal/meal-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";
import MealsLoadingPage from "@/app/meals/loading-out";


export const metadata = {
    title: 'All Meals | NextLevel Food',
    description: 'Browser the delicious meals from all over the world.',
};

 async function Meals(){
    const meals = await getMeals()
    return  <MealsGrid meals={meals} />
}
export default  function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<MealsLoadingPage/>}>
                <Meals/>
                </Suspense>
            </main>
        </>
    );
}