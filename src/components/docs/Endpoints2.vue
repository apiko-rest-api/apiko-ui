<template>
  <div>

    <h4>ID Parameters</h4>
    <p>
      Endpoint address may contain ID parameters in the format of <code>:name</code>, for example <code>/posts/:post/comments/:comment</code> will match a request such as <code>/posts/about-us/comment/46</code>. The parameters are named accordingly and can be accessed with <code>request.params</code> inside an endpoint handler function, e.g. <code>request.params.comment // == 46</code>.
    </p>

  </div>
</template>
