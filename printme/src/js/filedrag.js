(function() {

    function Parents(elem, selector)
    {
        for ( ; elem && elem !== document; elem = elem.parentNode )
        {
            if ( elem.matches( selector ) ) return elem;
        }

        return null;
    };

	function Output(block, msg)
    {
		block.querySelector(".js-file-messages").innerHTML = msg;
	}

	function FileDragHover(e)
    {
		e.stopPropagation();
		e.preventDefault();
	}

	function FileSelectHandler(e)
    {
		FileDragHover(e);

        var filedrag = e.target.classList.contains("js-file-drag") ? e.target : Parents(e.target, ".js-file-drag");

        var fileselect = filedrag.querySelector(".js-file-select");

		if (e.dataTransfer && e.dataTransfer.files) fileselect.files = e.dataTransfer.files;

        var files = fileselect.files;

		if (files.length == 1)
        {
            Output(filedrag, files[0].name);
        }
        else
        {
            Output(filedrag, 'Выбранно файлов: ' + files.length);
        }
	}

	function Init()
    {
        document.querySelectorAll(".js-file-drag").forEach(function(e){

            if (!e.querySelector(".js-file-select")) return;

            e.addEventListener("dragover", FileDragHover, false);
            e.addEventListener("dragleave", FileDragHover, false);
            e.addEventListener("drop", FileSelectHandler, false);

            e.querySelector(".js-file-select").addEventListener("change", FileSelectHandler, false);

            e.addEventListener("click", function(){

                e.querySelector(".js-file-select").click()

            }, false);
        });
	}

	if (window.File && window.FileList && window.FileReader)
    {
		Init();
	}

})();