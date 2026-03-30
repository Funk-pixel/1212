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
        const btnVisible = ref({});
        const selectedProduct = ref(null);

        // --- НОВЕ: СТАН БУРГЕР-МЕНЮ ---
        const isMenuOpen = ref(false);

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        // --- МЕТОДИ ---
        const addToCart = (id) => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!cart.includes(id)) {
                cart.push(id);
                localStorage.setItem('cart', JSON.stringify(cart));
                btnVisible.value[id] = true;
            }
        };

        onMounted(() => {
            // Визначаємо вибраний товар через URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            
            selectedProduct.value = products.value.find(p => p.id === productId) || products.value[0];

            // Перевіряємо кошик у LocalStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            products.value.forEach(p => {
                btnVisible.value[p.id] = cart.includes(p.id);
            });
        });

        // ПОВЕРТАЄМО ВСЕ В ШАБЛОН
        return { 
            products, 
            selectedProduct, 
            btnVisible, 
            isMenuOpen, // Повертаємо стан
            toggleMenu,  // Повертаємо функцію
            addToCart 
        };
    }
}).mount('#app');