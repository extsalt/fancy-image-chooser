class ImagePreview extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const container = this.createContainer();
        const imgPreview = this.createImgPreview();

        const id = this.getAttribute('id');
        const name = this.getAttribute('name');

        const chooser = this.imgChooser(id, name, imgPreview);

        container.appendChild(imgPreview);
        container.appendChild(chooser);
        shadow.appendChild(container);
    }

    createContainer() {
        const div = document.createElement('div');
        div.style.width = 'inherit';
        div.style.minHeight = '100%';
        div.style.position = 'relative';
        div.style.border = 'dashed blue 1px';
        div.style.borderRadius = '2%';
        return div;
    }

    createImgPreview() {
        const img = document.createElement('img');
        return img;
    }

    imgChooser(id, name, imgPreview) {
        let label = document.createElement('label');
        label.style.position = 'absolute';
        label.style.top = '0';
        label.style.left = '0';
        label.style.right = '0';
        label.style.bottom = '0';
        label.style.backgroundColor = '#c7c2c238';
        label.style.alignContent = 'center';
        label.setAttribute('for', id);

        const caption = document.createElement('span');

        caption.style.display = 'flex';
        caption.style.justifyContent = 'center';
        caption.style.alignItems = 'center';
        caption.style.width = '100%';
        caption.style.height = '100%';
        const spanText = document.createTextNode('Choose Photo');
        caption.appendChild(spanText);

        const file = document.createElement('input');
        file.type = 'file';
        file.setAttribute('id', id);
        file.setAttribute('name', name);
        file.style.display = 'none';

        file.addEventListener('change', function (e) {
            const url = URL.createObjectURL(e.target.files[0]);
            imgPreview.src = url;
            imgPreview.style.width = '100%';
        });

        const btn = document.createElement('button');
        btn.style.float = 'right';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.outline = 'none';
        btn.style.cursor = 'pointer';
        btn.style.padding = '.5rem';
        btn.style.color = 'red';
        const btnLabel = document.createTextNode('Remove');
        btn.appendChild(btnLabel);
        btn.addEventListener('click', function (e) {
            imgPreview.removeAttribute('src');
            imgPreview.style.width = '0';
            file.value = '';
        });
        label.appendChild(file);
        label.appendChild(btn);
        label.appendChild(caption);
        return label;
    }

    checkIdAndName() {
        // each image preview tag must have id and name
        // for form input
        if (!this.getAttribute('name')) return false;
        if (!this.getAttribute('id')) return false;

        return true;
    }
}

customElements.define('img-preview', ImagePreview);

