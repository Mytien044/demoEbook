(function () {
    $(function () {

            // --- Biến toàn cục ---
            const ebookList = document.getElementById("ebookList");
            const categoryFilter = document.getElementById("categoryFilter");
            const countStatus = document.getElementById("bookCountStatus");
            const loadMoreBtn = document.getElementById("loadMoreBtn");

            let allBooks = [];
            let revealedCount = 0;
            const baseVisible = 8;
            const increment = 16;

            // --- Render eBooks ---
            function renderEbooks(ebooks) {
                ebookList.innerHTML = "";

                if (!ebooks || ebooks.length === 0) {
                    ebookList.innerHTML = `<p class="text-center text-muted">Hiện chưa có ebook nào trong danh mục này.</p>`;
                    if (countStatus) countStatus.textContent = "";
                    if (loadMoreBtn) loadMoreBtn.style.display = "none";
                    return;
                }

                ebooks.forEach((ebook, index) => {
                    const hiddenClass = index >= baseVisible ? "hidden-book" : "";
                    const item = document.createElement("div");
                    item.className = `book-card ${hiddenClass}`;
                    item.innerHTML = `
                    <div class="book-cover">
                        <a href="/chi-tiet-ebook/${ebook.id}" title="${ebook.title}">
                            <img src="${ebook.avatar || '/assets/no-cover.png'}"
                                 alt="${ebook.title}"
                                 class="book-img"
                                 style="height: 240px; object-fit: cover;">
                        </a>
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">
                            <a href="/chi-tiet-ebook/${ebook.id}">${ebook.title}</a>
                        </h3>
                        <p class="book-author">${ebook.authorName || "Tác giả không rõ"}</p>
                        <div class="book-meta">
                            <span>${ebook.publishYear || 2023}</span>
                            <span>${ebook.bookTypeDDCName || "Đang cập nhật"}</span>
                        </div>
                        <div class="book-actions">
                            <button class="btn-read" onclick="window.location.href='/chi-tiet-ebook/${ebook.id}'">Đọc ngay</button>
                            <button class="btn-save"><i class="far fa-bookmark"></i></button>
                        </div>
                    </div>
                `;
                    ebookList.appendChild(item);
                });

                revealedCount = 0;
                updateLoadMoreState();
                updateCountDisplay();
            }

            // --- Cập nhật hiển thị đếm ---
            function updateCountDisplay() {
                if (!countStatus) return;
                const visibleCount = Math.min(baseVisible + revealedCount, allBooks.length);
                countStatus.textContent = `Đang xem ${visibleCount} / ${allBooks.length} sách`;
            }

            // --- Cập nhật trạng thái nút Xem thêm ---
            function updateLoadMoreState() {
                if (!loadMoreBtn) return;
                const hiddenBooks = document.querySelectorAll(".book-card.hidden-book");
                loadMoreBtn.style.display = hiddenBooks.length > 0 ? "inline-block" : "none";
            }

            // --- Xử lý khi bấm Xem thêm ---
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener("click", () => {
                    const hiddenBooks = Array.from(document.querySelectorAll(".book-card.hidden-book"));
                    const end = Math.min(increment, hiddenBooks.length);

                    for (let i = 0; i < end; i++) {
                        hiddenBooks[i].classList.remove("hidden-book");
                    }

                    revealedCount += end;
                    updateCountDisplay();
                    updateLoadMoreState();
                });
            }

/*           // --- Gọi API tải eBook ---
            async function loadEbooks(categoryId = null) {
                abp.ui.setBusy(ebookList);
                try {
                    const response = await abp.services.app.libPublic.getEBooks({
                        maxResultCount: 100,
                        ebookCategoryId: categoryId
                    });

                    console.log("API response:", response);

                    // Lấy danh sách ebook (tuỳ thuộc cấu trúc response)
                    allBooks = response.items || response || [];
                    renderEbooks(allBooks);
                } catch (error) {
                    console.error("❌ Lỗi khi tải eBook:", error);
                    ebookList.innerHTML = `<p class="text-danger text-center">Không thể tải dữ liệu.</p>`;
                    if (countStatus) countStatus.textContent = "";
                    if (loadMoreBtn) loadMoreBtn.style.display = "none";
                } finally {
                    abp.ui.clearBusy(ebookList);
                }
            }

            // --- Khi thay đổi danh mục ---
            if (categoryFilter) {
                categoryFilter.addEventListener("change", function () {
                    const selectedId = this.value || null;
                    loadEbooks(selectedId);
                });
            }
*/
async function loadCategories() {
    try {
        const response = await fetch('/JSON/data.json'); // đúng đường dẫn tới file
        const data = await response.json();

        const categories = data.categories || [];
        renderCategoryDropdown(categories);
    } catch (error) {
        console.error("❌ Không thể tải danh mục:", error);
        // Có thể hiển thị lỗi UI nếu cần
    }
}

function renderCategoryDropdown(categories) {
    const categoryFilter = document.getElementById("categoryFilter");

    if (!categoryFilter) return;

    // Xóa các options cũ (nếu có)
    categoryFilter.innerHTML = '<option value="">TẤT CẢ DANH MỤC</option>';

    // Thêm dữ liệu từ JSON
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categoryFilter.appendChild(option);
    });
}

// Gọi hàm sau khi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
});

            // --- Lần đầu load ---
            loadEbooks();

    });
})();