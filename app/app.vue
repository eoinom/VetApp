<script setup lang="ts">
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '@/constants';

useHead({
	link: [
		{
			rel: 'stylesheet',
			href: 'https://nordcdn.net/ds/fonts/3.0.3/fonts.css',
		},
	],
});
useSeoMeta({
	titleTemplate: (pageTitle) => (pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE),
	ogTitle: SITE_TITLE,
	description: SITE_DESCRIPTION,
	ogDescription: SITE_DESCRIPTION,
	author: SITE_AUTHOR,
	applicationName: SITE_TITLE,
	appleMobileWebAppTitle: SITE_TITLE,
	msapplicationTileColor: '#ffffff',
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
