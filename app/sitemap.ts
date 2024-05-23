import { getCategories, getProducts } from 'lib/swell';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const collectionsPromise = getCategories().then((categories) =>
    categories.map((category) => ({
      url: `${baseUrl}${category.slug}`
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`
    }))
  );

  const fetchedRoutes = (await Promise.all([collectionsPromise, productsPromise])).flat();

  return [...routesMap, ...fetchedRoutes];
}
