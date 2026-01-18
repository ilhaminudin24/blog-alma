import { defineQuery } from "next-sanity";

// Category queries
export const categoriesQuery = defineQuery(`*[_type == "category"] | order(order asc) {
  _id,
  "name": coalesce(name[$language], name['id']),
  "slug": slug.current,
  "description": coalesce(description[$language], description['id']),
  icon,
  color,
  order,
  isSpecial,
  specialHref
}`);

export const categoryQuery = defineQuery(`*[_type == "category" && slug.current == $slug][0] {
  _id,
  "name": coalesce(name[$language], name['id']),
  "slug": slug.current,
  "description": coalesce(description[$language], description['id']),
  icon,
  color
}`);

export const categoryPathsQuery = defineQuery(`*[_type == "category" && !isSpecial && defined(slug.current)][]{
  "slug": slug.current
}`);

// Post queries
export const postsQuery = defineQuery(`*[_type == "post"] | order(date desc) {
  _id,
  "title": coalesce(title[$language], title['id']),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$language], excerpt['id']),
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt[$language], coverImage.alt['id'])
  },
  date,
  "category": category->{
    "name": coalesce(name[$language], name['id']),
    "slug": slug.current
  },
  mood,

  featured,
  likes,
  layout
}`);

export const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$language], title['id']),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$language], excerpt['id']),
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt[$language], coverImage.alt['id'])
  },
  date,
  "category": category->{
    "name": coalesce(name[$language], name['id']),
    "slug": slug.current
  },
  mood,

  "content": coalesce(content[$language], content['id']),
  featured,
  likes,
  layout
}`);

export const featuredPostsQuery = defineQuery(`*[_type == "post" && (likes >= 1 || count(*[_type == "comment" && post._ref == ^._id && approved == true]) > 0)] | order(likes desc)[0...3] {
  _id,
  "title": coalesce(title[$language], title['id']),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$language], excerpt['id']),
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt[$language], coverImage.alt['id'])
  },
  date,
  "category": category->{
    "name": coalesce(name[$language], name['id']),
    "slug": slug.current
  },
  mood,

  featured,
  likes
}`);

export const postPathsQuery = defineQuery(`*[_type == "post" && defined(slug.current)][]{
  "slug": slug.current
}`);

export const postsByCategoryQuery = defineQuery(`*[_type == "post" && category->slug.current == $categorySlug] | order(date desc) {
  _id,
  "title": coalesce(title[$language], title['id']),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$language], excerpt['id']),
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt[$language], coverImage.alt['id'])
  },
  date,
  "category": category->{
    "name": coalesce(name[$language], name['id']),
    "slug": slug.current
  },
  mood,

  featured,
  likes,
  layout
}`);

export const postCommentsQuery = defineQuery(`* [_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt desc) {
  _id,
  name,
  content,
  _createdAt
}`);

// About page query
export const aboutQuery = defineQuery(`* [_type == "about"][0] {
  name,
  "greeting": coalesce(greeting[$language], greeting['id']),
  "introduction": coalesce(introduction[$language], introduction['id']),
  "storyTitle": coalesce(storyTitle[$language], storyTitle['id']),
  "story": story[]{
  "text": coalesce(@[$language], @['id'])
},
  "funFactsTitle": coalesce(funFactsTitle[$language], funFactsTitle['id']),
  "funFacts": funFacts[]{
  icon,
  "label": coalesce(label[$language], label['id']),
  "value": coalesce(value[$language], value['id'])
},
  "favoritesTitle": coalesce(favoritesTitle[$language], favoritesTitle['id']),
  "favorites": favorites[]{
  "category": coalesce(category[$language], category['id']),
  "items": items[]{ "name": coalesce(@[$language], @['id']) },
  color
  }
}`);

// Site Settings query (Hero + Footer)
export const siteSettingsQuery = defineQuery(`* [_type == "siteSettings"][0] {
  // Hero Section
  "heroTitle": coalesce(heroTitle[$language], heroTitle['id']),
    "heroSubtitle": coalesce(heroSubtitle[$language], heroSubtitle['id']),
      "heroChips": heroChips[]{
    emoji,
      "text": coalesce(text[$language], text['id'])
  },
  "heroPrimaryButton": {
    "text": coalesce(heroPrimaryButton.text[$language], heroPrimaryButton.text['id']),
      "scrollTarget": heroPrimaryButton.scrollTarget
  },
  "heroSecondaryButton": {
    "text": coalesce(heroSecondaryButton.text[$language], heroSecondaryButton.text['id']),
      "scrollTarget": heroSecondaryButton.scrollTarget
  },

  // Footer Section
  "footerBrandName": coalesce(footerBrandName[$language], footerBrandName['id']),
    "footerTagline": coalesce(footerTagline[$language], footerTagline['id']),
      "footerQuickLinksTitle": coalesce(footerQuickLinksTitle[$language], footerQuickLinksTitle['id']),
        "footerQuickLinks": footerQuickLinks[]{
    "label": coalesce(label[$language], label['id']),
      href
  },
  "footerConnectTitle": coalesce(footerConnectTitle[$language], footerConnectTitle['id']),
    footerSocialLinks,
    "footerDmText": coalesce(footerDmText[$language], footerDmText['id']),
      "footerCopyrightPrefix": coalesce(footerCopyrightPrefix[$language], footerCopyrightPrefix['id']),
        "footerCopyrightSuffix": coalesce(footerCopyrightSuffix[$language], footerCopyrightSuffix['id']),

  // Q&A Widget
  "showAskWidget": coalesce(showAskWidget, true)
} `);
