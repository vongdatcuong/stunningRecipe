FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
const filePondImgFilter = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/tiff', 'image/tif']
const recipeImgFilePondOption = {
  labelIdle: "<i class='fa fa-camera'></i> Kéo thả ảnh hoặc <span class='filepond--label-action'> Browse </span>",
  allowMultiple: false,
  acceptedFileTypes: filePondImgFilter
}

const recipeNewIngreFilePonOption = {
  labelIdle: "<i class='fa fa-camera'></i> Kéo thả ảnh hoặc <span class='filepond--label-action'> Browse </span>",
  allowMultiple: false,
  acceptedFileTypes: filePondImgFilter
}

const recipeGuideFilePonOption = {
  labelIdle: "<i class='fa fa-camera'></i> Kéo thả ảnh hoặc <span class='filepond--label-action'> Browse </span>",
  allowMultiple: true,
  acceptedFileTypes: filePondImgFilter,
  maxFiles: 6
}

const recipeImage = document.getElementById("recipe-image");
const recipeImagePond = FilePond.create( recipeImage , recipeImgFilePondOption);