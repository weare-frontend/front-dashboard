<template>
<div> 
    <div class="col-12 mt-4">
        <h5 class="text-center text-white font-weight-100">โปรโมชั่นทั้งหมด</h5>
    </div>
    <br>
    <br>
    <client-only placeholder="Loading...">
        <carousel-3d :display="3" :perspective="0" :space="300" :autoplay='true' :autoplay-timeout='2400' :width="300" :height="300" class="w-100">
            <slide v-for="(pro, i) in slides" :index="i" :key="i">
                <figure>
                    <img :src="pro.img" />
                </figure>
            </slide>
        </carousel-3d>
    </client-only>
</div>
</template>

<script>
export default {
    props: {
        slides: Array,
    },
}
</script>
