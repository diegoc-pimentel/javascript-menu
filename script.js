const container = document.querySelector('.menu-container');
const addBtn = document.getElementById('add-item');
const RemoveBtn = document.getElementById('remove-item');
const filterBtn = document.getElementById('filter-items');
const toggleThemeBtn = document.getElementById('toggle-theme');
const fetchBtn = document.getElementById('fetch-items');
const countBtn = document.getElementById('count-items');

let menu = [
  { name: "Array", category: "Main", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" },
  { name: "Push", category: "Main", image: "https://png.pngtree.com/png-clipart/20240831/original/pngtree-vegetable-italian-slice-piece-pizza-vintage-png-image_15897644.png" },
  { name: "Pop", category: "Dessert", image: "https://www.alecsicecream.com/cdn/shop/files/Alec_s_IceCream_OPEN_TVB.png?v=1713234762&width=1445" }
];

function renderMenu(items){
    container.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.category}</p>
        </div>
        `).join('');
}
renderMenu(menu);


// PUSH & POP
addBtn.addEventListener('click', () => {
    const newDish = {
        name: "New Dish",
        category: "Main",
        image: "https://picsum.photos/200/150?random=" + Math.floor(Math.random() * 1000)
    };

    menu.push(newDish);
    renderMenu(menu);

    RemoveBtn.addEventListener('click', () => {
    menu.pop();
    renderMenu(menu);
    })
});

//FILTER

filterBtn.addEventListener('click', () => {
    const desserts = menu.filter(item => item.category === "Dessert");
    renderMenu(desserts);
});

//DARK-MODE
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme', 'dark');
} else {
    localStorage.setItem('theme', 'light');
}

//FETCH BTN
fetchBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    menu = data;
    renderMenu(menu);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

//REDUCE BTN
countBtn.addEventListener('click', () => {
  const counts = menu.reduce((acc, item) => {
    acc.total++;

    // Count by category
    if (item.category === "Core") acc.core++;
    else if (item.category === "Method") acc.method++;
    else if (item.category === "Async") acc.async++;

    return acc;
  }, { total: 0, core: 0, method: 0, async: 0 });

  alert(
    `Total: ${counts.total}\n` +
    `Core: ${counts.core}\n` +
    `Method: ${counts.method}\n` +
    `Async: ${counts.async}`
  );
});