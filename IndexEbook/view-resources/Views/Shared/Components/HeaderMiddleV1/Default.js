(function () {
    $(function () {
        $(".btn-search").click(function (){
            location.href = "/ebook/tim-kiem/"+$(".input-search").val();
        });
        
        $(document).keypress(function (e) {
            let sideBar = $('#kt_quick_sidebar');
            if (e.which === 13 && (sideBar === undefined || !sideBar.hasClass('kt-quick-panel--on'))) {
                location.href = "/ebook/tim-kiem/"+$(".input-search").val();
            }
        });

        // JavaScript cho Thư Viện Số

        document.addEventListener('DOMContentLoaded', function () {
            // Xử lý tìm kiếm
            const searchInput = document.querySelector('.search-bar input');
            const searchButton = document.querySelector('.search-bar button');

            searchButton.addEventListener('click', function () {
                performSearch();
            });

            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });

            function performSearch() {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`Đang tìm kiếm: "${query}"`);
                    // Trong thực tế, bạn sẽ chuyển hướng đến trang kết quả tìm kiếm
                    // hoặc gọi API để lấy kết quả
                }
            }

            // Xử lý lưu sách
            const saveButtons = document.querySelectorAll('.btn-save');
            saveButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const bookTitle = this.closest('.book-card').querySelector('.book-title').textContent;
                    const icon = this.querySelector('i');

                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        this.style.backgroundColor = '#ffeb3b';
                        alert(`Đã thêm "${bookTitle}" vào tủ sách của bạn`);
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        this.style.backgroundColor = '#eee';
                        alert(`Đã xóa "${bookTitle}" khỏi tủ sách của bạn`);
                    }
                });
            });

            // Xử lý đọc sách
            const readButtons = document.querySelectorAll('.btn-read');
            readButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const bookTitle = this.closest('.book-card').querySelector('.book-title').textContent;
                    alert(`Đang mở "${bookTitle}" để đọc...`);
                    // Trong thực tế, bạn sẽ chuyển hướng đến trang đọc sách
                });
            });

            // Xử lý danh mục
            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('click', function () {
                    const categoryName = this.querySelector('h3').textContent;
                    alert(`Đang chuyển đến danh mục: ${categoryName}`);
                    // Trong thực tế, bạn sẽ chuyển hướng đến trang danh mục
                });
            });


            // Hiệu ứng scroll cho navigation
            window.addEventListener('scroll', function () {
                const nav = document.querySelector('nav');
                if (window.scrollY > 100) {
                    nav.style.position = 'fixed';
                    nav.style.top = '0';
                    nav.style.width = '100%';
                    nav.style.zIndex = '1000';
                } else {
                    nav.style.position = 'static';
                }
            });
        });
        function borrowBook() {
            alert("Bạn đã gửi yêu cầu mượn sách thành công! Vui lòng chờ quản trị viên xác nhận.");
        }

        // --- Cập nhật tiêu đề khi chọn bộ lọc ---
        const titleEl = document.getElementById('pageTitle');
        const categorySel = document.getElementById('categoryFilter');
        const sortSel = document.getElementById('sortFilter');

        if (titleEl && categorySel && sortSel) {
            const defaultTitle = titleEl.textContent.trim();

            function getSelectedTitle(selectEl) {
                const opt = selectEl.options[selectEl.selectedIndex];
                return opt?.dataset.title || opt.textContent;
            }

            function updateTitle() {
                const catTitle = getSelectedTitle(categorySel);
                const sortTitle = getSelectedTitle(sortSel);

                // Bạn có thể đổi format hiển thị ở đây tùy ý
                if (catTitle === "Tất cả Ebook" && sortTitle === "Tất cả Ebook") {
                    titleEl.textContent = defaultTitle;
                } else if (catTitle === "Tất cả Ebook") {
                    titleEl.textContent = `Sách ${sortTitle}`;
                } else if (sortTitle === "Tất cả Ebook") {
                    titleEl.textContent = `Sách ${catTitle}`;
                } else {
                    titleEl.textContent = `${catTitle} — ${sortTitle}`;
                }
            }

            categorySel.addEventListener('change', updateTitle);
            sortSel.addEventListener('change', updateTitle);

            updateTitle(); // Cập nhật khi trang load
        }
        // Chỉ áp dụng cho thanh tìm kiếm trong offcanvas
        $('.off-canvas-wrapper .search-box .btn-search').on('click', function (e) {
            e.preventDefault();
            const keyword = $(this).closest('.search-box').find('.input-search').val().trim();
            if (keyword) {
                const encodedKeyword = encodeURIComponent(keyword);
                window.location.href = `/ebook/tim-kiem/${encodedKeyword}`;
            }
        });

        // Cho phép nhấn Enter để tìm
        $('.off-canvas-wrapper .search-box .input-search').on('keypress', function (e) {
            if (e.which === 13) {
                e.preventDefault();
                $(this).closest('.search-box').find('.btn-search').trigger('click');
            }
        });

    });
})();