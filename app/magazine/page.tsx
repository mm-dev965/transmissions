"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "tm_gallery_magazine_v2";
const ADMIN_PASS = "TM-123A";

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  titleAr: string;
  titleEn: string;
}

const DEFAULT_ITEMS: MediaItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  type: "image",
  src: `/magazine-pics/${i + 1}.jpg`,
  titleAr: `ترانس ميشنز - صفحة ${i + 1}`,
  titleEn: `Trans Missions - Page ${i + 1}`,
}));

export default function MagazinePage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [items, setItems] = useState<MediaItem[]>(DEFAULT_ITEMS);
  const [pageIndex, setPageIndex] = useState(0);
  const [zoomItem, setZoomItem] = useState<MediaItem | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassBox, setShowPassBox] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [fileError, setFileError] = useState("");

  const isAr = lang === "ar";

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("app_lang") as "ar" | "en" | null;
      if (savedLang === "ar" || savedLang === "en") {
        setLang(savedLang);
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // تجاهل
    }
  }, []);

  const toggleLang = () => {
    const next = isAr ? "en" : "ar";
    setLang(next);
    try {
      localStorage.setItem("app_lang", next);
    } catch {
      // تجاهل
    }
  };

  const handlePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput.trim() === ADMIN_PASS) {
      setIsAdmin(true);
      setShowPassBox(false);
      setPassInput("");
      setPassError("");
    } else {
      setPassError(isAr ? "كلمة المرور غير صحيحة" : "Invalid password");
    }
  };

  const lockAdmin = () => {
    setIsAdmin(false);
    setShowAddForm(false);
    setEditingId(null);
  };

  const updateItems = (nextItems: MediaItem[]) => {
    setItems(nextItems);
    if (pageIndex >= nextItems.length && nextItems.length > 0) {
      setPageIndex(Math.max(0, nextItems.length - 1));
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    } catch {
      setFileError(
        isAr
          ? "حجم الملف كبير جداً للحفظ الدائم في المتصفح؛ يُفضل استخدام مسار أو رابط مباشر."
          : "File is too large for browser storage; please use a direct path or URL."
      );
    }
  };

  const total = items.length;
  const rightItem = total > 0 ? items[pageIndex % total] : null;
  const leftItem = total > 1 ? items[(pageIndex + 1) % total] : null;

  const goNext = () => {
    if (total <= 1) return;
    setPageIndex((prev) => (prev + 2) % total);
  };

  const goPrev = () => {
    if (total <= 1) return;
    setPageIndex((prev) => (prev - 2 + total * 2) % total);
  };

  const startEditing = (e: React.MouseEvent, item: MediaItem) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setEditingId(item.id);
    setEditTitle(isAr ? item.titleAr : item.titleEn);
  };

  const saveEditTitle = (e: React.FormEvent, idToEdit: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdmin) return;
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    const updated = items.map((it) =>
      it.id === idToEdit ? { ...it, titleAr: trimmed, titleEn: trimmed } : it
    );
    updateItems(updated);
    setEditingId(null);
    setEditTitle("");
  };

  const handleDeleteItem = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    if (!isAdmin) return;
    const filtered = items.filter((it) => it.id !== idToDelete);
    updateItems(filtered);
    if (zoomItem?.id === idToDelete) {
      setZoomItem(null);
    }
    if (editingId === idToDelete) {
      setEditingId(null);
    }
  };

  const handleResetDefault = () => {
    if (!isAdmin) return;
    setFileError("");
    setPageIndex(0);
    setZoomItem(null);
    setEditingId(null);
    updateItems(DEFAULT_ITEMS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // تجاهل
    }
  };

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const isEmbedVideo = (src: string) =>
    src.includes("youtube.com/embed") || src.includes("player.vimeo.com");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const detectedType: "image" | "video" = file.type.startsWith("video/")
      ? "video"
      : "image";
    setMediaType(detectedType);
    if (!titleInput.trim()) {
      setTitleInput(file.name.replace(/\.[^/.]+$/, ""));
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUrlInput(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFileError("");
    const cleanSrc = urlInput.trim();
    if (!cleanSrc) {
      setFileError(
        isAr
          ? "يرجى إدخال مسار أو رابط الملف أو اختيار ملف من الجهاز."
          : "Please enter a file path/URL or choose a file from your device."
      );
      return;
    }

    const finalSrc = mediaType === "video" ? getEmbedUrl(cleanSrc) : cleanSrc;
    const label =
      titleInput.trim() ||
      (mediaType === "video"
        ? isAr
          ? `فيديو ترانس ميشنز ${total + 1}`
          : `Trans Missions Video ${total + 1}`
        : isAr
        ? `صفحة ترانس ميشنز ${total + 1}`
        : `Trans Missions Page ${total + 1}`);

    const newEntry: MediaItem = {
      id: `${mediaType}-${Date.now()}`,
      type: mediaType,
      src: finalSrc,
      titleAr: label,
      titleEn: label,
    };

    updateItems([...items, newEntry]);
    setTitleInput("");
    setUrlInput("");
    setShowAddForm(false);
  };

  const renderPage = (item: MediaItem | null, pageNum: string) => {
    if (!item) {
      return (
        <div className="min-h-[380px] flex items-center justify-center text-neutral-500 text-sm">
          {isAr ? "غلاف خلفي - ترانس ميشنز" : "Back Cover - Trans Missions"}
        </div>
      );
    }

    const title = isAr ? item.titleAr : item.titleEn;
    const isEditingThis = isAdmin && editingId === item.id;

    return (
      <div
        onClick={() => {
          if (!isEditingThis) setZoomItem(item);
        }}
        className="flex flex-col justify-between h-full cursor-pointer rounded-xl p-3 hover:bg-emerald-400/5 transition"
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-emerald-400">{pageNum}</span>
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => startEditing(e, item)}
                className="px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs transition cursor-pointer"
              >
                {isAr ? "تعديل" : "Edit"}
              </button>
              <button
                type="button"
                onClick={(e) => handleDeleteItem(e, item.id)}
                className="px-2.5 py-1 rounded-md bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs transition cursor-pointer"
              >
                {isAr ? "حذف" : "Delete"}
              </button>
            </div>
          ) : (
            <span className="text-[11px] text-emerald-400">
              {isAr ? "اضغط للتكبير" : "Click to Zoom"}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[300px] max-h-[420px] overflow-hidden rounded-xl bg-neutral-950 p-2">
          {item.type === "video" ? (
            <div className="w-full h-[280px] flex items-center justify-center relative bg-neutral-900 rounded-lg">
              <span className="relative z-10 bg-emerald-400 text-neutral-950 px-4 py-1.5 rounded-full text-xs font-bold">
                {isAr ? "▶ فيديو — اضغط للتشغيل" : "▶ Video — Click to Play"}
              </span>
              {!isEmbedVideo(item.src) && (
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          ) : (
            <img
              src={item.src}
              alt={title}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
            />
          )}
        </div>

        <div className="mt-3 pt-2.5 border-t border-neutral-800">
          {isEditingThis ? (
            <form
              onSubmit={(e) => saveEditTitle(e, item.id)}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-2.5 py-1 rounded-lg border border-emerald-400/50 bg-neutral-900 text-white text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-emerald-500 text-neutral-950 text-xs font-bold cursor-pointer"
              >
                {isAr ? "حفظ" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-xs cursor-pointer"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-neutral-100 m-0">{title}</p>
              <span className="text-[11px] text-emerald-400 whitespace-nowrap">
                {isAr ? "تكبير" : "Zoom"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col"
    >
      <header className="border-b border-neutral-800 bg-neutral-900/95 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl border border-emerald-400/50 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs sm:text-sm font-bold transition"
          >
            {isAr ? "← العودة إلى الموقع" : "← Back to Website"}
          </Link>
          <span className="text-sm sm:text-base font-bold text-white">
            {isAr
              ? "ترانس ميشنز للتجارة والخدمات"
              : "Trans Missions Trading & Services"}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleLang}
          className="px-3.5 py-1.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:border-emerald-400 text-xs sm:text-sm font-semibold transition cursor-pointer"
        >
          {isAr ? "EN" : "عربي"}
        </button>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">
            {isAr
              ? "مجلة ترانس ميشنز التفاعلية"
              : "Trans Missions Interactive Magazine"}
          </h1>
          <p className="text-sm text-neutral-400">
            {isAr
              ? "استعراض متكامل لصور وصفحات ترانس ميشنز بأبعادها الطبيعية مع إمكانية التكبير"
              : "Full-aspect-ratio showcase for Trans Missions pages with zoom view"}
          </p>
        </div>

        {/* المجلة مع زرين من الجنب */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label={isAr ? "الصفحة السابقة" : "Previous page"}
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-emerald-400/50 bg-neutral-900/90 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg transition cursor-pointer"
          >
            {isAr ? "→" : "←"}
          </button>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_14px_1fr] bg-neutral-900 border border-emerald-400/30 rounded-2xl shadow-2xl overflow-hidden min-h-[460px]">
            <div className="p-4 flex flex-col justify-between bg-neutral-950/70">
              {renderPage(
                rightItem,
                total > 0
                  ? isAr
                    ? `صـ ${(pageIndex % total) + 1}`
                    : `P. ${(pageIndex % total) + 1}`
                  : ""
              )}
            </div>

            <div
              aria-hidden="true"
              className="h-1.5 lg:h-auto w-full bg-gradient-to-r from-black/70 via-emerald-400/30 to-black/70"
            />

            <div className="p-4 flex flex-col justify-between bg-neutral-950/70">
              {renderPage(
                leftItem,
                leftItem && total > 0
                  ? isAr
                    ? `صـ ${((pageIndex + 1) % total) + 1}`
                    : `P. ${((pageIndex + 1) % total) + 1}`
                  : ""
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label={isAr ? "الصفحة التالية" : "Next page"}
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-emerald-400/50 bg-neutral-900/90 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg transition cursor-pointer"
          >
            {isAr ? "←" : "→"}
          </button>
        </div>

        {/* زرين من تحت + أرقام الصفحات */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={goPrev}
              disabled={total <= 1}
              className="px-5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:border-emerald-400 hover:text-emerald-400 disabled:opacity-40 text-xs sm:text-sm font-bold transition cursor-pointer disabled:cursor-not-allowed"
            >
              {isAr ? "الصفحة السابقة" : "Previous"}
            </button>

            <span className="text-xs sm:text-sm font-bold text-neutral-200 px-2">
              {total > 0
                ? isAr
                  ? `صفحة ${(pageIndex % total) + 1} من ${total}`
                  : `Page ${(pageIndex % total) + 1} of ${total}`
                : isAr
                ? "0 صفحة"
                : "0 pages"}
            </span>

            <button
              type="button"
              onClick={goNext}
              disabled={total <= 1}
              className="px-5 py-2.5 rounded-xl border border-emerald-400 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs sm:text-sm font-bold transition cursor-pointer disabled:cursor-not-allowed"
            >
              {isAr ? "الصفحة التالية" : "Next"}
            </button>
          </div>

          <div className="flex justify-center gap-1.5 flex-wrap">
            {items.map((it, idx) => (
              <button
                key={it.id}
                type="button"
                onClick={() => setPageIndex(idx)}
                className={`w-7 h-7 rounded-md border text-xs transition cursor-pointer ${
                  idx === pageIndex % total
                    ? "bg-emerald-400 text-neutral-950 border-emerald-400 font-bold"
                    : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-emerald-400"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* قسم الإضافة والتعديل من تحت بباسورد TM-123A */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 flex flex-col items-center gap-4">
          {!isAdmin ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setPassError("");
                  setShowPassBox((prev) => !prev);
                }}
                className="px-4 py-2 rounded-xl border border-neutral-700/80 bg-neutral-900/70 hover:border-emerald-400/60 text-neutral-300 hover:text-emerald-300 text-xs sm:text-sm transition cursor-pointer"
              >
                {isAr
                  ? "إضافة وتعديل (بكلمة مرور)"
                  : "Add & Edit (Password Protected)"}
              </button>

              {showPassBox && (
                <form
                  onSubmit={handlePassSubmit}
                  className="flex items-center gap-2 flex-wrap justify-center"
                >
                  <input
                    type="password"
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value)}
                    placeholder={isAr ? "أدخلي كلمة المرور" : "Enter password"}
                    className="px-3.5 py-2 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl border border-emerald-400 bg-emerald-500 text-neutral-950 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    {isAr ? "فتح" : "Unlock"}
                  </button>
                  {passError && (
                    <span className="text-xs text-red-400 w-full text-center">
                      {passError}
                    </span>
                  )}
                </form>
              )}
            </>
          ) : (
            <div className="w-full max-w-3xl space-y-5">
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setFileError("");
                    setShowAddForm((prev) => !prev);
                  }}
                  className="px-4 py-2 rounded-xl border border-emerald-400 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  {showAddForm
                    ? isAr
                      ? "إغلاق نموذج الإضافة"
                      : "Close Add Form"
                    : isAr
                    ? "+ إضافة صورة أو فيديو"
                    : "+ Add Image or Video"}
                </button>

                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800/70 hover:border-emerald-400 hover:text-emerald-300 text-xs sm:text-sm transition cursor-pointer"
                >
                  {isAr ? "استعادة الافتراضي" : "Reset Default"}
                </button>

                <button
                  type="button"
                  onClick={lockAdmin}
                  className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-900 hover:border-red-400 text-neutral-300 hover:text-red-300 text-xs sm:text-sm transition cursor-pointer"
                >
                  {isAr ? "قفل التعديل" : "Lock"}
                </button>
              </div>

              {showAddForm && (
                <form
                  onSubmit={handleAddSubmit}
                  className="p-5 rounded-2xl bg-neutral-900 border border-emerald-400/30 space-y-4"
                >
                  <div className="flex gap-4 flex-wrap">
                    <label className="flex flex-col gap-1.5 text-xs sm:text-sm min-w-[150px]">
                      {isAr ? "النوع:" : "Type:"}
                      <select
                        value={mediaType}
                        onChange={(e) =>
                          setMediaType(e.target.value as "image" | "video")
                        }
                        className="px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-xs sm:text-sm"
                      >
                        <option value="image">{isAr ? "صورة" : "Image"}</option>
                        <option value="video">{isAr ? "فيديو" : "Video"}</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs sm:text-sm flex-1 min-w-[200px]">
                      {isAr ? "العنوان:" : "Title:"}
                      <input
                        type="text"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        placeholder={
                          isAr
                            ? "مثال: جولة داخل الشركة"
                            : "Example: Office Walkthrough"
                        }
                        className="px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-xs sm:text-sm"
                      />
                    </label>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <label className="flex flex-col gap-1.5 text-xs sm:text-sm flex-1 min-w-[240px]">
                      {isAr
                        ? "مسار الملف أو رابط الفيديو / الصورة:"
                        : "File path or Image/Video URL:"}
                      <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="/magazine-pics/21.jpg or video URL"
                        className="px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-xs sm:text-sm"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs sm:text-sm">
                      {isAr ? "أو اختاري ملفاً من الجهاز:" : "Or choose file:"}
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="py-1.5 text-xs"
                      />
                    </label>
                  </div>

                  {fileError && (
                    <div className="text-red-400 text-xs sm:text-sm">
                      {fileError}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl border border-emerald-400 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs sm:text-sm font-bold transition cursor-pointer"
                    >
                      {isAr ? "إضافة إلى المجلة" : "Add to Magazine"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      {zoomItem && (
        <div
          onClick={() => setZoomItem(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-neutral-900 border border-emerald-400/35 rounded-2xl p-5 text-center"
          >
            <button
              type="button"
              onClick={() => setZoomItem(null)}
              className="absolute top-3 left-3.5 w-9 h-9 rounded-full bg-neutral-800 hover:bg-emerald-400 text-white hover:text-neutral-950 text-xl flex items-center justify-center transition cursor-pointer"
            >
              ×
            </button>

            <div className="flex items-center justify-center min-h-[260px] max-h-[75vh]">
              {zoomItem.type === "video" ? (
                isEmbedVideo(zoomItem.src) ? (
                  <iframe
                    src={zoomItem.src}
                    title={isAr ? zoomItem.titleAr : zoomItem.titleEn}
                    className="w-full max-w-3xl h-[440px] border-0 rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={zoomItem.src}
                    controls
                    autoPlay
                    className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl"
                  />
                )
              ) : (
                <img
                  src={zoomItem.src}
                  alt={isAr ? zoomItem.titleAr : zoomItem.titleEn}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl"
                />
              )}
            </div>

            <div className="mt-3 text-emerald-400 text-base font-bold">
              {isAr ? zoomItem.titleAr : zoomItem.titleEn}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}