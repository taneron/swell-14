'use client';

import clsx from 'clsx';
import { type SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ListItem, PathFilterItem } from '.';

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const getActive = () => pathname === '/search/' + item.slug;

  const [active, setActive] = useState(getActive);

  useEffect(() => {
    setActive(getActive);
  }, [pathname, item.slug]);

  const DynamicTag = active ? 'p' : Link;


  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.name}>
      <DynamicTag
        href={createUrl('/search/' + item.slug, searchParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.name}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white" key={item.name}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {item.name}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'sortKey' in item ? <SortFilterItem item={item} /> : <PathFilterItem item={item} />;
}
