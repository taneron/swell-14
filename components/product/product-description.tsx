import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import { VariantSelector } from './variant-selector';
import { Suspense } from 'react';

export function ProductDescription({ product }: { product: ProductFragment }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.price}
            currencyCode={product.currency}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants.results} stockPurchasable={product.stockTracking === false || product.stockPurchasable}
        />
      </Suspense>

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <Suspense fallback={null}>
        <AddToCart product={product} availableForSale={product.stockTracking === false || product.stockPurchasable} />
      </Suspense>
    </>
  );
}
