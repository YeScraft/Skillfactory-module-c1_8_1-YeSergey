function jQuery(selector, context = document){
    this.elements = Array.from(context.querySelectorAll(selector));
    return this;
}
// Читайте комментарий с задания про jQuery.prototype.text().
jQuery.prototype.each = function (fn){
    this.elements.forEach((element, index) => fn(element, element, index));
    return this;
}

// Метод введён для наглядности при проверке.
jQuery.prototype.click = function (fn){
    this.each((element) => element.addEventListener("click", fn));
    return this;
}

// Метод jQuery.prototype.html()
jQuery.prototype.html = function(htmlString=""){
    /* Возвращается содержимое только первого элемента в наборе
     (независимо от количества подобных элементов, выбранных селектором).
    */
    if (!htmlString){
        content = this.elements[0].innerHTML;
        return content;
    }
    /* Задает новое содержимое для выбранных элементов 
     (может содержать HTML теги).
    */
    else if (typeof(htmlString) === 'string'){
        this.each((element) => element.innerHTML = htmlString);
        return this;
    }
    /* Заменяет html-содержимое каждого выбранного элемента в наборе
     на возвращенное функцией function значение. Функция вызывается, 
     для каждого из выбранных элементов.
    */
    else if (typeof(htmlString) === 'function'){
        this.elements.forEach((element, index) => element.innerHTML=(htmlString(element.innerHTML, index)));
    }
    else {
        return console.log("Некорректный формат данных");
    }
}

const $ = (selector) => new jQuery(selector);

// Проверка каждого из трёх условий:

// $("#button").click(function(){
//     console.log($("p").html());
// });

// $("#button").click(function(){
//     $("p").html("ХА <b>XAXAXA</b>")
// });

$("#button").click(function(){
    $("p").html(function(currentHtmlString, index){
        return "Старое содержимое элемента под индексом " + index + ": <b>" + currentHtmlString + "</b>";
    });
});
