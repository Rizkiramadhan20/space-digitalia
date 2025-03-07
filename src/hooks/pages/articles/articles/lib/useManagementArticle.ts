import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { ArticleType } from "@/hooks/pages/articles/articles/lib/schema";

import { FetchArticle } from "@/hooks/pages/articles/articles/lib/FetchArticle";

import { formatSlug } from "@/base/helper/formatSlug";

export function useManagementArticle() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ArticleType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 9;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = FetchArticle((newArticle) => {
      const sortedArticles = newArticle.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setArticles(sortedArticles);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags &&
          Array.isArray(article.tags) &&
          article.tags.some((tag) => tag.toLowerCase().includes(query)))
    );

    setSearchResults(results.slice(0, 5));
  };

  const handleSearchResultClick = (article: ArticleType) => {
    const modal = document.getElementById("search_modal") as HTMLDialogElement;
    if (modal) modal.close();
    setSelectedCategory(article.category);
    setSearchQuery("");
    setSearchResults([]);
    router.push(`/articles/${formatSlug(article.tags[0])}/${article.slug}`);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModalOpen = () => {
    const modal = document.getElementById("search_modal") as HTMLDialogElement;
    document.body.style.overflow = "hidden";
    modal?.showModal();
  };

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
  };

  // Computed values
  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const topArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);
  const paginatedArticles = otherArticles.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(otherArticles.length / ITEMS_PER_PAGE);

  return {
    // State
    articles,
    loading,
    selectedCategory,
    searchQuery,
    searchResults,
    currentPage,
    // Computed values
    topArticle,
    paginatedArticles,
    totalPages,
    // Handlers
    setSelectedCategory,
    handleSearch,
    handleSearchResultClick,
    handlePageChange,
    handleModalOpen,
    handleModalClose,
  };
}
