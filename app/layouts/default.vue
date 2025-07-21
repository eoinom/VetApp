<script setup lang="ts">
import { computed, ref } from 'vue';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '~/constants';
import '@nordhealth/components/lib/Select';
import '@nordhealth/components/lib/TopBar';

type Theme = 'light' | 'light-high-contrast' | 'dark' | 'dark-high-contrast' | 'auto';

type ThemeOption = {
	val: Theme;
	label: string;
	href?: string;
};

const themes: ThemeOption[] = [
	{
		val: 'light',
		label: 'Light theme',
		href: 'https://nordcdn.net/ds/themes/9.0.0/vet.css',
	},
	{
		val: 'light-high-contrast',
		label: 'Light high contrast theme',
		href: 'https://nordcdn.net/ds/themes/9.0.0/vet-high-contrast.css',
	},
	{
		val: 'dark',
		label: 'Dark theme',
		href: 'https://nordcdn.net/ds/themes/9.0.0/vet-dark.css',
	},
	{
		val: 'dark-high-contrast',
		label: 'Dark high contrast theme',
		href: 'https://nordcdn.net/ds/themes/9.0.0/vet-dark-high-contrast.css',
	},
	{
		val: 'auto',
		label: 'Auto (system preference)',
	},
];

const getThemeOption = (value: Theme): ThemeOption | undefined =>
	themes.find((theme) => theme.val === value);

const currentThemeOption = ref<ThemeOption>(getThemeOption('auto')!); // Default to system preference

const fontLink = {
	rel: 'stylesheet',
	href: 'https://nordcdn.net/ds/fonts/3.0.3/fonts.css',
};

const currentThemeLink = computed(() => {
	let themeHref;
	if (currentThemeOption.value.val === 'auto') {
		// Detect system theme preference
		const preferenceIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		themeHref = preferenceIsDark ? getThemeOption('dark')!.href : getThemeOption('light')!.href;
	} else {
		themeHref = currentThemeOption.value.href;
	}
	return {
		rel: 'stylesheet',
		href: themeHref,
		id: 'theme-link',
	};
});
const headLinks = computed(() => [fontLink, currentThemeLink.value]);

const changeTheme = (themeValue: Theme) => (currentThemeOption.value = getThemeOption(themeValue)!);

useHead({
	title: SITE_TITLE,
	meta: [
		{ name: 'description', content: SITE_DESCRIPTION },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'author', content: SITE_AUTHOR },
		{ name: 'application-name', content: SITE_TITLE },
		{ name: 'apple-mobile-web-app-title', content: SITE_TITLE },
		{ name: 'msapplication-TileColor', content: '#ffffff' },
	],
	link: headLinks,
});
</script>

<template>
	<nord-top-bar>
		<span>{{ SITE_TITLE }}</span>
		<div slot="end">
			<nord-select
				:value="currentThemeOption.val"
				size="s"
				hide-label
				class=""
				@change="changeTheme(($event.target as HTMLSelectElement)?.value as Theme)"
			>
				<option v-for="themeOption in themes" :key="themeOption.val" :value="themeOption.val">
					{{ themeOption.label }}
				</option>
			</nord-select>
		</div>
	</nord-top-bar>

	<main class="n-stack-horizontal">
		<Transition name="fade" mode="out-in" appear>
			<NuxtPage />
		</Transition>
	</main>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
