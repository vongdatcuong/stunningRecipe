(function(){
  FilePond.registerPlugin(
    FilePondPluginImagePreview
  );

  const recipeImage = document.getElementById("recipe-image");
  const recipeImagePond = FilePond.create( recipeImage , {
    labelIdle: "<i class='fa fa-camera'></i> Kéo thả ảnh hoặc <span class='filepond--label-action'> Browse </span>"
  });
})();