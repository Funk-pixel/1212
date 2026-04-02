const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        // --- ДАНІ ТОВАРІВ ---
        const products = ref([
            { 
                id: 1, 
                title: 'Star Ruby', 
                short_text: 'Deep red flesh, very sweet', 
                image: 'rubi.jpg', 
                desc: 'The Star Ruby is world-renowned for its intense, dark red interior...',
                weight: '400-550g',
                color: 'Deep Dark Red'
            },
            { 
                id: 2, 
                title: 'Marsh Seedless', 
                short_text: 'White flesh, classic flavor', 
                image: 'foster-tamu.jpg', 
                desc: 'A classic white grapefruit known for its large size...',
                weight: '450-600g',
                color: 'Creamy White'
            },
            { 
                id: 3, 
                title: 'Flame', 
                short_text: 'Pink-red blush, rich taste', 
                image: 'triu.jpg', 
                desc: 'Flame is a standout hybrid that maintains its beautiful pink-red interior...',
                weight: '380-500g',
                color: 'Bright Pink-Red'
            },
            { 
                id: 4, 
                title: 'Rio Star', 
                short_text: 'Texas favorite, red flesh', 
                image: 'duncan.jpg', 
                desc: 'Rio Star combines high lycopene content with exceptional flavor...',
                weight: '420-530g',
                color: 'Vibrant Red'
            },
            { 
                id: 5, 
                title: 'Oro Blanco', 
                short_text: 'Sweet white hybrid', 
                image: 'red son.jpg', 
                desc: 'An extraordinary cross between a pummelo and a white grapefruit...',
                weight: '500-700g',
                color: 'Pale Gold / White'
            }
        ]);

        // --- СТАН КОШИКА ТА ВИБРАНОГО ТОВАРУ ---
        const cart = ref([]); // Товари, які відображаються в таблиці кошика
        const btnVisible = ref({});
        const selectedProduct = ref(null);
        const submitted = ref(false); // Стан успішної відправки форми

        // Поля форми контактів
        const contactFields = ref({
            name: '',
            companyName: '',
            position: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            userType: 'seed-producer',
            otherSpecify: '',
            interest: ''
        });

        // --- СТАН БУРГЕР-МЕНЮ ---
        const isMenuOpen = ref(false);

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        // --- МЕТОДИ ---

        // Функція оновлення списку товарів у кошику (для таблиці)
        const updateCartList = () => {
            const storedCartIds = JSON.parse(localStorage.getItem('cart')) || [];
            cart.value = products.value.filter(p => storedCartIds.includes(p.id));
        };

        // Додавання в кошик (для сторінки товарів)
        const addToCart = (id) => {
            let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!storedCart.includes(id)) {
                storedCart.push(id);
                localStorage.setItem('cart', JSON.stringify(storedCart));
                btnVisible.value[id] = true;
                updateCartList();
            }
        };

        // Видалення з кошика (для таблиці на сторінці контактів)
        const removeFromCart = (id) => {
            let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            storedCart = storedCart.filter(cartId => cartId !== id);
            localStorage.setItem('cart', JSON.stringify(storedCart));
            
            btnVisible.value[id] = false;
            updateCartList();
        };

        // Відправка замовлення
        const makeOrder = () => {
            console.log("Form Data Submitted:", contactFields.value);
            
            // Очищення даних
            localStorage.removeItem('cart');
            cart.value = [];
            submitted.value = true;
        };

        onMounted(() => {
            // Визначаємо вибраний товар через URL (для сторінки product_detail)
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            if (productId) {
                selectedProduct.value = products.value.find(p => p.id === productId);
            }

            // Перевіряємо кошик у LocalStorage та оновлюємо стан кнопок і таблиці
            const storedCartIds = JSON.parse(localStorage.getItem('cart')) || [];
            products.value.forEach(p => {
                btnVisible.value[p.id] = storedCartIds.includes(p.id);
            });
            
            updateCartList();
        });

        // ПОВЕРТАЄМО ВСЕ В ШАБЛОН
        return { 
            products, 
            cart,
            selectedProduct, 
            btnVisible, 
            isMenuOpen,
            contactFields,
            submitted,
            toggleMenu,
            addToCart,
            removeFromCart,
            makeOrder
        };
    }
}).mount('#app');