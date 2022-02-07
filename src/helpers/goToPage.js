export default function goToPage(page, pageParams) {
  this.currentPage = page;
  this.currentPageParams = pageParams || {};
}
