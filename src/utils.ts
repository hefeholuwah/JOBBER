/*
 * This file contains all useful functions and data structures used to
 * dynamically update React components.
 */

// 1. The Page title updater function
export function updatePageTitle(title: string) {
    document.title = title;
}