export type FAQAction = 'EDIT' | 'DELETE';
export type PageAction = 'EDIT' | 'DELETE';
export type ContactAction = 'VIEW' | 'DELETE';

import { Faq } from "../types/faq.admin";
import { Page } from "../types/page.admin";
import { Contact } from "../types/contact.admin";

export function getFAQActions(faq: Faq): FAQAction[] {
  return ['EDIT', 'DELETE'];
}

export function getPageActions(page: Page): PageAction[] {
  return ['EDIT', 'DELETE'];
}

export function getContactActions(contact: Contact): ContactAction[] {
  return ['VIEW', 'DELETE'];
}
